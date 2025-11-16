# MenyQR - Teknisk Implementeringsguide

## Firebase Setup og Konfigurasjon

### 1. Firebase Project Setup

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Login og initialiser
firebase login
firebase init

# Velg følgende services:
# - Firestore
# - Authentication  
# - Hosting
# - Storage
# - Functions (for webhooks)
```

### 2. Firestore Database Schema

```typescript
// types/models.ts

// User Model
interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  organizationId?: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  subscription: {
    tier: 'freemium' | 'bronze' | 'silver' | 'gold';
    status: 'active' | 'cancelled' | 'past_due';
    stripeCustomerId?: string;
    currentPeriodEnd?: Timestamp;
  };
  settings: {
    language: 'no' | 'en' | 'sv' | 'da' | 'fi';
    timezone: string;
    notifications: {
      email: boolean;
      analytics: boolean;
      marketing: boolean;
    };
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Menu Model
interface Menu {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  theme: {
    template: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    customCss?: string;
    logo?: string;
    backgroundImage?: string;
  };
  categories: Category[];
  metadata: {
    views: number;
    lastViewed?: Timestamp;
    qrScans: number;
    createdBy: string;
  };
  settings: {
    showPrices: boolean;
    showImages: boolean;
    showAllergens: boolean;
    currency: 'NOK' | 'SEK' | 'DKK' | 'EUR' | 'USD';
    language: string;
  };
  location?: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Category Model
interface Category {
  id: string;
  name: string;
  description?: string;
  sortOrder: number;
  isVisible: boolean;
  items: MenuItem[];
}

// MenuItem Model
interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  allergens?: string[];
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free')[];
  isAvailable: boolean;
  isPopular?: boolean;
  sortOrder: number;
  customFields?: Record<string, any>;
}

// Analytics Event Model
interface AnalyticsEvent {
  id: string;
  menuId: string;
  eventType: 'view' | 'qr_scan' | 'item_click' | 'share';
  sessionId?: string;
  metadata: {
    userAgent?: string;
    referer?: string;
    device?: 'mobile' | 'tablet' | 'desktop';
    country?: string;
    city?: string;
  };
  timestamp: Timestamp;
}
```

### 3. Firestore Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function hasSubscription() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.subscription.status == 'active';
    }
    
    function getTier() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.subscription.tier;
    }
    
    function canCreateMenus() {
      let tier = getTier();
      let menuCount = get(/databases/$(database)/documents/users/$(request.auth.uid)).data.menuCount;
      
      return (tier == 'freemium' && menuCount < 1) ||
             (tier == 'bronze' && menuCount < 3) ||
             tier == 'silver' ||
             tier == 'gold';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow create: if isOwner(userId);
      allow update: if isOwner(userId);
      allow delete: if false;
    }
    
    // Menus collection
    match /menus/{menuId} {
      allow read: if resource.data.isActive == true || 
                     (isAuthenticated() && resource.data.organizationId == get(/databases/$(database)/documents/users/$(request.auth.uid)).data.organizationId);
      allow create: if isAuthenticated() && canCreateMenus();
      allow update: if isAuthenticated() && 
                      resource.data.organizationId == get(/databases/$(database)/documents/users/$(request.auth.uid)).data.organizationId;
      allow delete: if isAuthenticated() && 
                      resource.data.organizationId == get(/databases/$(database)/documents/users/$(request.auth.uid)).data.organizationId;
    }
    
    // Analytics collection (write-only for public)
    match /analytics/{document=**} {
      allow read: if isAuthenticated();
      allow create: if true;
      allow update: if false;
      allow delete: if false;
    }
  }
}
```

### 4. Stripe Integration Setup

```typescript
// lib/stripe/config.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Price IDs fra Stripe Dashboard
export const PRICE_IDS = {
  bronze: {
    monthly: process.env.STRIPE_PRICE_BRONZE_MONTHLY!,
    yearly: process.env.STRIPE_PRICE_BRONZE_YEARLY!,
  },
  silver: {
    monthly: process.env.STRIPE_PRICE_SILVER_MONTHLY!,
    yearly: process.env.STRIPE_PRICE_SILVER_YEARLY!,
  },
  gold: {
    monthly: process.env.STRIPE_PRICE_GOLD_MONTHLY!,
    yearly: process.env.STRIPE_PRICE_GOLD_YEARLY!,
  },
};

// lib/stripe/checkout.ts
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    locale: 'no',
  });

  return session;
}

// lib/stripe/webhook.ts
export async function handleStripeWebhook(
  body: string,
  signature: string
): Promise<void> {
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutComplete(event.data.object);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdate(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionCancelled(event.data.object);
      break;
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
  }
}
```

### 5. Core React Components

```tsx
// components/menu/MenuEditor.tsx
import { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useMenu } from '@/hooks/useMenu';
import { useDebounce } from '@/hooks/useDebounce';

export const MenuEditor: React.FC<{ menuId: string }> = ({ menuId }) => {
  const { menu, updateMenu, loading, error } = useMenu(menuId);
  const [localMenu, setLocalMenu] = useState(menu);
  const debouncedMenu = useDebounce(localMenu, 500);

  useEffect(() => {
    if (debouncedMenu && debouncedMenu !== menu) {
      updateMenu(debouncedMenu);
    }
  }, [debouncedMenu]);

  const handleCategoryDrop = useCallback((dragIndex: number, dropIndex: number) => {
    const draggedCategory = localMenu.categories[dragIndex];
    const newCategories = [...localMenu.categories];
    
    // Remove dragged item
    newCategories.splice(dragIndex, 1);
    // Insert at new position
    newCategories.splice(dropIndex, 0, draggedCategory);
    
    // Update sort orders
    const updatedCategories = newCategories.map((cat, index) => ({
      ...cat,
      sortOrder: index,
    }));
    
    setLocalMenu({
      ...localMenu,
      categories: updatedCategories,
    });
  }, [localMenu]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        {/* Sidebar with categories */}
        <div className="w-64 bg-gray-50 border-r p-4">
          <h3 className="font-semibold mb-4">Kategorier</h3>
          {localMenu.categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              onDrop={handleCategoryDrop}
            />
          ))}
          <button
            onClick={addNewCategory}
            className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400"
          >
            + Legg til kategori
          </button>
        </div>

        {/* Main editor area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedCategory && (
            <ItemsEditor
              category={selectedCategory}
              onUpdate={updateCategory}
            />
          )}
        </div>

        {/* Preview panel */}
        <div className="w-96 bg-gray-50 border-l p-4">
          <h3 className="font-semibold mb-4">Forhåndsvisning</h3>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <MenuPreview menu={localMenu} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

// components/menu/QRGenerator.tsx
import QRCode from 'qrcode';
import { useState } from 'react';
import { Download, Share2 } from 'lucide-react';

export const QRGenerator: React.FC<{ menuId: string; tier: string }> = ({ 
  menuId, 
  tier 
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const menuUrl = `${process.env.NEXT_PUBLIC_APP_URL}/m/${menuId}`;

  useEffect(() => {
    generateQR();
  }, [menuId]);

  const generateQR = async () => {
    try {
      const url = await QRCode.toDataURL(menuUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'H',
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error('QR generation failed:', err);
    }
  };

  const downloadQR = async (format: 'png' | 'svg' | 'pdf') => {
    if (tier === 'freemium' && format !== 'png') {
      // Show upgrade prompt
      showUpgradeModal();
      return;
    }

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = `menu-qr-${menuId}.png`;
      link.href = qrDataUrl;
      link.click();
    } else if (format === 'svg') {
      const svgString = await QRCode.toString(menuUrl, { type: 'svg' });
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `menu-qr-${menuId}.svg`;
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">QR-kode for menyen</h3>
      
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
          {qrDataUrl && <img src={qrDataUrl} alt="Menu QR Code" />}
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => downloadQR('png')}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <Download size={20} />
          Last ned PNG
        </button>
        
        <button
          onClick={() => downloadQR('svg')}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg ${
            tier === 'freemium' 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <Download size={20} />
          Last ned SVG
          {tier === 'freemium' && <span className="text-xs">(Bronze+)</span>}
        </button>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Meny URL:</p>
        <p className="text-xs text-gray-500 break-all">{menuUrl}</p>
      </div>
    </div>
  );
};
```

### 6. API Routes

```typescript
// app/api/menus/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/firebase/admin';
import { checkTierLimits } from '@/lib/utils/tier-limits';

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const menusSnapshot = await db
      .collection('menus')
      .where('organizationId', '==', session.user.organizationId)
      .orderBy('createdAt', 'desc')
      .get();

    const menus = menusSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ menus });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch menus' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();
  
  // Check tier limits
  const canCreate = await checkTierLimits(session.user.id, 'menus');
  
  if (!canCreate) {
    return NextResponse.json(
      { error: 'Menu limit reached for your plan' },
      { status: 403 }
    );
  }

  try {
    const menuData = {
      ...data,
      organizationId: session.user.organizationId,
      createdBy: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: {
        views: 0,
        qrScans: 0,
      },
    };

    const docRef = await db.collection('menus').add(menuData);

    return NextResponse.json({
      id: docRef.id,
      ...menuData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create menu' },
      { status: 500 }
    );
  }
}

// app/api/analytics/track/route.ts
export async function POST(request: NextRequest) {
  const data = await request.json();
  const { menuId, eventType, metadata } = data;

  // Get user info from headers
  const userAgent = request.headers.get('user-agent');
  const referer = request.headers.get('referer');
  
  // Get IP for geolocation (in production)
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip');

  try {
    const eventData = {
      menuId,
      eventType,
      timestamp: new Date(),
      sessionId: data.sessionId || generateSessionId(),
      metadata: {
        ...metadata,
        userAgent,
        referer,
        device: detectDevice(userAgent),
      },
    };

    await db.collection('analytics').add(eventData);

    // Update menu stats
    if (eventType === 'view') {
      await db.collection('menus').doc(menuId).update({
        'metadata.views': admin.firestore.FieldValue.increment(1),
        'metadata.lastViewed': new Date(),
      });
    } else if (eventType === 'qr_scan') {
      await db.collection('menus').doc(menuId).update({
        'metadata.qrScans': admin.firestore.FieldValue.increment(1),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}
```

### 7. Custom Hooks

```typescript
// hooks/useMenu.ts
import { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuth } from './useAuth';

export function useMenu(menuId: string) {
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!menuId || !user) return;

    const unsubscribe = onSnapshot(
      doc(db, 'menus', menuId),
      (doc) => {
        if (doc.exists()) {
          setMenu({ id: doc.id, ...doc.data() } as Menu);
        } else {
          setError(new Error('Menu not found'));
        }
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [menuId, user]);

  const updateMenu = async (updates: Partial<Menu>) => {
    if (!menuId) return;
    
    try {
      await updateDoc(doc(db, 'menus', menuId), {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (err) {
      setError(err as Error);
    }
  };

  return { menu, loading, error, updateMenu };
}

// hooks/useSubscription.ts
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSubscription = async () => {
      try {
        const response = await fetch('/api/subscription');
        const data = await response.json();
        setSubscription(data);
      } catch (error) {
        console.error('Failed to fetch subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  const canUseFeature = (feature: string): boolean => {
    if (!subscription) return false;
    
    const tierFeatures = {
      freemium: ['basic_menu', 'qr_code'],
      bronze: ['basic_menu', 'qr_code', 'themes', 'analytics'],
      silver: ['all_bronze', 'unlimited_menus', 'api', 'custom_css'],
      gold: ['all_features'],
    };

    const tier = subscription.tier;
    return tierFeatures[tier]?.includes(feature) || 
           tierFeatures[tier]?.includes('all_features');
  };

  return { subscription, loading, canUseFeature };
}
```

### 8. Environment Variables

```bash
# .env.local

# App
NEXT_PUBLIC_APP_URL=https://menyqr.no
NEXT_PUBLIC_APP_NAME=MenyQR

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase Admin (Server-side)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_BRONZE_MONTHLY=
STRIPE_PRICE_BRONZE_YEARLY=
STRIPE_PRICE_SILVER_MONTHLY=
STRIPE_PRICE_SILVER_YEARLY=
STRIPE_PRICE_GOLD_MONTHLY=
STRIPE_PRICE_GOLD_YEARLY=

# NextAuth
NEXTAUTH_URL=https://menyqr.no
NEXTAUTH_SECRET=

# Email (SendGrid/Resend)
EMAIL_API_KEY=
EMAIL_FROM=noreply@menyqr.no

# Analytics
MIXPANEL_TOKEN=
GA_MEASUREMENT_ID=

# Sentry
SENTRY_DSN=

# Feature Flags
ENABLE_BETA_FEATURES=false
ENABLE_MAINTENANCE_MODE=false
```

### 9. Package.json Dependencies

```json
{
  "name": "menyqr",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:e2e": "playwright test",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "analyze": "ANALYZE=true next build"
  },
  "dependencies": {
    "next": "14.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.3.2",
    "@types/react": "^18.2.42",
    "@types/node": "^20.10.3",
    
    "firebase": "^10.7.0",
    "firebase-admin": "^11.11.1",
    
    "stripe": "^14.8.0",
    "@stripe/stripe-js": "^2.2.0",
    
    "next-auth": "^4.24.5",
    "next-intl": "^3.3.2",
    
    "@tanstack/react-query": "^5.12.2",
    "zustand": "^4.4.7",
    
    "react-dnd": "^16.0.1",
    "react-dnd-html5-backend": "^16.0.1",
    
    "qrcode": "^1.5.3",
    "sharp": "^0.33.0",
    
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-toast": "^1.1.5",
    
    "tailwindcss": "^3.3.6",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    
    "lucide-react": "^0.294.0",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0",
    
    "zod": "^3.22.4",
    "react-hook-form": "^7.48.2",
    "@hookform/resolvers": "^3.3.2"
  },
  "devDependencies": {
    "@types/qrcode": "^1.5.5",
    "eslint": "^8.55.0",
    "eslint-config-next": "14.0.3",
    "prettier": "^3.1.1",
    "jest": "^29.7.0",
    "@testing-library/react": "^14.1.2",
    "@playwright/test": "^1.40.1",
    "@next/bundle-analyzer": "^14.0.3"
  }
}
```

### 10. Deployment Configuration

```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          # ... andre env variabler
      
      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: menyqr-production
          channelId: live
```

Dette gir deg en komplett teknisk implementeringsguide med all kode og konfigurasjon du trenger for å bygge MenyQR!