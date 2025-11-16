# MenyQR - Komplett Prosjektplan og Utviklingsguide

## 📋 Prosjektoversikt

**MenyQR** er en SaaS-plattform for digitale restaurantmenyer med QR-kode integrasjon, bygget for det nordiske markedet med global skalerbarhet.

### Teknisk Stack
- **Frontend/Backend:** Next.js 14+ (App Router)
- **Database:** Firebase Firestore
- **Autentisering:** Firebase Auth
- **Storage:** Firebase Storage
- **Hosting:** Firebase Hosting
- **Betalingsløsning:** Stripe
- **Styling:** Tailwind CSS
- **Analytics:** Firebase Analytics + Mixpanel
- **E-post:** Resend/SendGrid
- **QR-generering:** qrcode.js
- **Internasjonalisering:** next-intl

## 🗂️ Hierarkisk Filstruktur

```
menyqr/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy-preview.yml
│   │   └── deploy-production.yml
│   └── ISSUE_TEMPLATE/
├── public/
│   ├── images/
│   │   ├── logo/
│   │   ├── icons/
│   │   └── og/
│   ├── locales/
│   │   ├── no/
│   │   ├── en/
│   │   ├── sv/
│   │   ├── da/
│   │   └── fi/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── register/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── forgot-password/
│   │   │   │       └── page.tsx
│   │   │   ├── (dashboard)/
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── menus/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── [menuId]/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── edit/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   └── new/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── profile/
│   │   │   │   │   ├── billing/
│   │   │   │   │   └── locations/
│   │   │   │   └── subscription/
│   │   │   │       └── page.tsx
│   │   │   ├── (public)/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── pricing/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── features/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── about/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── contact/
│   │   │   │       └── page.tsx
│   │   │   ├── m/
│   │   │   │   └── [menuId]/
│   │   │   │       └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── error.tsx
│   │   │   └── not-found.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   ├── stripe/
│   │   │   │   ├── webhook/
│   │   │   │   ├── checkout/
│   │   │   │   └── portal/
│   │   │   ├── menus/
│   │   │   │   ├── route.ts
│   │   │   │   └── [menuId]/
│   │   │   ├── analytics/
│   │   │   │   └── track/
│   │   │   └── qr/
│   │   │       └── generate/
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown.tsx
│   │   │   ├── input.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── toast.tsx
│   │   ├── dashboard/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── MenuGrid.tsx
│   │   ├── menu/
│   │   │   ├── MenuEditor.tsx
│   │   │   ├── CategoryManager.tsx
│   │   │   ├── DishCard.tsx
│   │   │   ├── PreviewPane.tsx
│   │   │   └── QRGenerator.tsx
│   │   ├── pricing/
│   │   │   ├── PricingCard.tsx
│   │   │   └── FeatureComparison.tsx
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── SEO.tsx
│   │   │   └── LanguageSelector.tsx
│   │   └── analytics/
│   │       ├── Chart.tsx
│   │       └── MetricCard.tsx
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── config.ts
│   │   │   ├── auth.ts
│   │   │   ├── firestore.ts
│   │   │   └── storage.ts
│   │   ├── stripe/
│   │   │   ├── config.ts
│   │   │   ├── products.ts
│   │   │   └── subscriptions.ts
│   │   ├── utils/
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   ├── seo.ts
│   │   │   └── analytics.ts
│   │   └── hooks/
│   │       ├── useAuth.ts
│   │       ├── useSubscription.ts
│   │       ├── useMenu.ts
│   │       └── useAnalytics.ts
│   ├── types/
│   │   ├── menu.d.ts
│   │   ├── user.d.ts
│   │   ├── subscription.d.ts
│   │   └── api.d.ts
│   ├── services/
│   │   ├── MenuService.ts
│   │   ├── UserService.ts
│   │   ├── AnalyticsService.ts
│   │   └── EmailService.ts
│   ├── middleware.ts
│   └── constants/
│       ├── pricing.ts
│       ├── features.ts
│       └── themes.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/
│   ├── seed.ts
│   ├── migrate.ts
│   └── backup.ts
├── .env.local.example
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.ts
├── next.config.js
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Design System og Fargepalett

### Primære Farger
```css
/* Hovedfarger - Moderne og appetittvekkende */
--primary: #10B981;        /* Emerald Green - Miljøvennlig, frisk */
--primary-dark: #059669;   /* Mørkere grønn for hover */
--secondary: #3B82F6;      /* Bright Blue - Tillit og profesjonalitet */
--accent: #F59E0B;         /* Amber - CTA og oppmerksomhet */
--danger: #EF4444;         /* Red - Varsler og feil */
--success: #10B981;        /* Green - Bekreftelser */

/* Nøytrale */
--background: #FFFFFF;
--surface: #F9FAFB;
--border: #E5E7EB;
--text-primary: #111827;
--text-secondary: #6B7280;
--text-muted: #9CA3AF;

/* Dark Mode */
--dark-bg: #0F172A;
--dark-surface: #1E293B;
--dark-border: #334155;
```

### Typography
```css
/* Font Stack */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Poppins', var(--font-sans);

/* Sizes */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
```

## 💰 Prisstruktur (Optimalisert)

### Freemium (0 kr/mnd)
- 1 meny
- Maks 20 retter
- Grunnleggende tema
- MenyQR branding
- Basic analytics
- Standard QR-kode

### Bronze (99 kr/mnd | 990 kr/år)
- 3 menyer
- 50 retter per meny
- 5 premium temaer
- Egen logo
- Detaljert analytics
- HD QR-kode nedlasting
- E-post support

### Silver (199 kr/mnd | 1990 kr/år)
- Ubegrenset menyer
- Ubegrenset retter
- Alle temaer + custom CSS
- Multi-location (5 steder)
- Avansert analytics + eksport
- API-tilgang
- Prioritert support
- Ingen MenyQR branding

### Gold (399 kr/mnd | 3990 kr/år)
- Alt i Silver +
- Ubegrenset lokasjoner
- White-label løsning
- Betalingsintegrasjon
- Bordbestilling
- Team-tilgang (5 brukere)
- Dedikert support
- Custom domene

## 🔍 SEO Strategi og Søkeord

### Primære Søkeord (Norge)
1. **digital meny restaurant** (720 søk/mnd)
2. **qr meny** (590 søk/mnd)
3. **elektronisk meny** (480 søk/mnd)
4. **restaurant meny app** (390 søk/mnd)
5. **digital speisekort** (320 søk/mnd)

### Long-tail Søkeord
- "lage digital meny restaurant gratis"
- "qr kode meny norsk"
- "beste digitale menyløsning norge"
- "papirløs restaurant meny"
- "miljøvennlig meny restaurant"

### SEO Implementering
```typescript
// src/lib/utils/seo.ts
export const defaultSEO = {
  title: 'MenyQR - Digitale Menyer for Restauranter | QR-kode Menyløsning',
  description: 'Lag profesjonelle digitale menyer for din restaurant med QR-koder. Miljøvennlig, alltid oppdatert, og mobiloptimalisert. Start gratis!',
  keywords: 'digital meny, qr meny, restaurant meny, elektronisk speisekort, menyqr, digital menu norway',
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    alternateLocales: ['en_US', 'sv_SE', 'da_DK', 'fi_FI'],
    siteName: 'MenyQR',
    images: [
      {
        url: 'https://menyqr.no/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MenyQR - Digitale Menyer',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};
```

### Strukturerte Data (Schema.org)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "MenyQR",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "0",
    "highPrice": "399",
    "priceCurrency": "NOK"
  }
}
```

## 🔌 Integreringer og API-er

### Firebase Setup
```javascript
// firebase.config.js
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
```

### Firestore Collections Structure
```
users/
  └── {userId}/
      ├── profile
      ├── subscription
      └── settings

organizations/
  └── {orgId}/
      ├── details
      ├── locations/
      └── team/

menus/
  └── {menuId}/
      ├── metadata
      ├── categories/
      ├── items/
      └── theme

analytics/
  └── {menuId}/
      └── {date}/
          ├── views
          ├── clicks
          └── devices

subscriptions/
  └── {userId}/
      ├── stripe_customer_id
      ├── status
      └── tier
```

### Stripe Integration
```typescript
// Stripe Products Setup
const products = {
  bronze: {
    priceId: 'price_bronze_monthly',
    priceIdYearly: 'price_bronze_yearly',
    features: ['3 menyer', '50 retter', '5 temaer']
  },
  silver: {
    priceId: 'price_silver_monthly',
    priceIdYearly: 'price_silver_yearly',
    features: ['Ubegrenset menyer', 'Custom CSS', 'API tilgang']
  },
  gold: {
    priceId: 'price_gold_monthly',
    priceIdYearly: 'price_gold_yearly',
    features: ['White-label', 'Betalingsintegrasjon', 'Team tilgang']
  }
};
```

## 📊 Analytics og Tracking

### Mixpanel Events
```typescript
// Key Events to Track
const events = {
  // User Journey
  'User Registered': { method: 'email|google' },
  'Menu Created': { tier: 'freemium|bronze|silver|gold' },
  'QR Downloaded': { format: 'png|pdf|svg' },
  'Subscription Started': { plan: 'bronze|silver|gold', billing: 'monthly|yearly' },
  
  // Menu Performance
  'Menu Viewed': { menuId, source: 'qr|direct|social' },
  'Item Clicked': { menuId, itemId, category },
  'Analytics Viewed': { menuId, dateRange },
  
  // Conversion
  'Upgrade Initiated': { from: 'freemium', to: 'bronze|silver|gold' },
  'Payment Completed': { amount, plan },
  'Churn': { reason, tier }
};
```

## 🚀 Development Faser med Sjekklister

### Fase 1: MVP Foundation (Uke 1-2) ✅
- [ ] Next.js prosjekt setup med TypeScript
- [ ] Firebase prosjekt opprettet og konfigurert
- [ ] Tailwind CSS og design system implementert
- [ ] Autentisering (Firebase Auth) med e-post og Google
- [ ] Grunnleggende routing struktur
- [ ] Responsive layout templates
- [ ] Environment variables setup
- [ ] Git repository og branch strategi

### Fase 2: Core Functionality (Uke 3-4) ✅
- [ ] Firestore database schema implementert
- [ ] User registration og onboarding flow
- [ ] Dashboard UI med navigasjon
- [ ] Menu CRUD operasjoner
- [ ] Drag-and-drop menu editor
- [ ] Real-time preview funksjonalitet
- [ ] QR-kode generering og nedlasting
- [ ] Public menu visning (/m/[menuId])

### Fase 3: Monetization (Uke 5-6) ✅
- [ ] Stripe konto og produkter opprettet
- [ ] Subscription tiers implementert
- [ ] Payment flow med Stripe Checkout
- [ ] Billing portal integration
- [ ] Tier-baserte feature begrensninger
- [ ] Subscription webhook handlers
- [ ] Invoice og receipt e-poster
- [ ] Freemium upsell prompts

### Fase 4: Analytics & Optimization (Uke 7-8) ✅
- [ ] Analytics tracking implementert
- [ ] Dashboard analytics visning
- [ ] Menu performance metrics
- [ ] A/B testing framework
- [ ] Page load optimalisering
- [ ] Image optimization (Next/Image)
- [ ] Caching strategi
- [ ] Error tracking (Sentry)

### Fase 5: Internasjonalisering (Uke 9) ✅
- [ ] next-intl setup
- [ ] Oversettelser for alle språk
- [ ] Språk-switching UI
- [ ] Locale-basert routing
- [ ] Formattering av valuta og dato
- [ ] SEO per språk
- [ ] Legal pages per marked

### Fase 6: Advanced Features (Uke 10-11) ✅
- [ ] Multi-location support
- [ ] Team collaboration features
- [ ] Advanced theming options
- [ ] API for eksterne integrasjoner
- [ ] Bulk import/export
- [ ] Scheduled menu updates
- [ ] Allergen og dietary labels
- [ ] Menu versioning og rollback

### Fase 7: Testing & QA (Uke 12) ✅
- [ ] Unit tests (Jest)
- [ ] Integration tests
- [ ] E2E tests (Playwright)
- [ ] Performance testing
- [ ] Security audit
- [ ] GDPR compliance check
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Load testing

### Fase 8: Pre-Launch (Uke 13) ✅
- [ ] Production environment setup
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Domain og SSL setup
- [ ] CDN konfigurering
- [ ] Backup strategi
- [ ] Monitoring og alerting
- [ ] Support system (Intercom/Crisp)
- [ ] Documentation og help center
- [ ] Legal dokumenter (ToS, Privacy)

### Fase 9: Launch Preparation ✅
- [ ] Beta testing med utvalgte kunder
- [ ] Bug fixes fra beta feedback
- [ ] Marketing materialer
- [ ] Social media oppsett
- [ ] Email campaigns forberedt
- [ ] Launch landing page
- [ ] Press kit
- [ ] Onboarding videos

### Fase 10: Post-Launch ✅
- [ ] Performance monitoring
- [ ] User feedback collection
- [ ] Iterative improvements
- [ ] Feature prioritization
- [ ] Growth metrics tracking
- [ ] Customer support optimization
- [ ] Referral program
- [ ] Partnership outreach

## 🔒 Sikkerhet og Compliance

### Security Checklist
- [ ] Firebase Security Rules implementert
- [ ] API rate limiting
- [ ] Input validation og sanitization
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] SQL injection prevention (Firestore parameterized queries)
- [ ] Secure headers (CSP, HSTS)
- [ ] Secrets i environment variables
- [ ] Regular dependency updates
- [ ] Penetration testing

### GDPR Compliance
- [ ] Privacy Policy
- [ ] Cookie consent
- [ ] Data export funksjonalitet
- [ ] Account deletion
- [ ] Data minimization
- [ ] Consent logging
- [ ] DPA med underleverandører

## 📈 Success Metrics og KPIs

### Business Metrics
- **MRR Target:** 50,000 NOK innen 12 måneder
- **Customer Target:** 300-400 aktive kunder
- **Conversion Rate:** 5-20% (Freemium → Paid)
- **Churn Rate:** <5% månedlig
- **ARPU:** 150-200 NOK
- **CAC:** <500 NOK
- **LTV:CAC Ratio:** >3:1

### Product Metrics
- **Time to First Menu:** <5 minutter
- **Daily Active Users:** 40% av total
- **QR Scans per Menu:** >100/måned
- **Feature Adoption:** >60% bruker analytics
- **Support Tickets:** <2% av aktive brukere
- **Page Load Time:** <2 sekunder
- **Uptime:** 99.9%

## 🛠️ Tech Stack Best Practices

### Code Quality
```javascript
// ESLint Configuration
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

### Performance Optimization
- Lazy loading av komponenter
- Image optimization med next/image
- Code splitting per route
- Firestore compound indexes
- Redis caching for hot data
- CDN for static assets
- Brotli compression

### Monitoring Stack
- **Error Tracking:** Sentry
- **Performance:** Firebase Performance
- **Analytics:** Mixpanel + GA4
- **Uptime:** Better Uptime
- **Logs:** Firebase Functions logs

## 📝 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database indexed properly
- [ ] Security rules tested
- [ ] SSL certificate active
- [ ] Backup strategy implemented
- [ ] Rollback plan documented

### Deployment
- [ ] Deploy to staging first
- [ ] Smoke tests on staging
- [ ] Database migrations run
- [ ] Deploy to production
- [ ] Verify all services
- [ ] Monitor for errors
- [ ] Update status page

### Post-Deployment
- [ ] Announce release
- [ ] Monitor metrics
- [ ] Gather feedback
- [ ] Document lessons learned
- [ ] Plan next iteration

## 🎯 Go-to-Market Strategy

### Launch Strategy
1. **Soft Launch:** Beta med 20-30 restauranter
2. **Feedback Integration:** 2 uker iterasjon
3. **Public Launch:** PR og markedsføring
4. **Growth Phase:** Paid ads og partnerships

### Marketing Kanaler
- **Content Marketing:** SEO-optimaliserte artikler
- **Social Media:** Instagram, Facebook, LinkedIn
- **Email:** Onboarding og engagement
- **Partnerships:** POS-systemer, restaurantforeninger
- **Referral Program:** 20% lifetime commission

### Target Segments
1. **Små kafeer:** Enkel, rimelig løsning
2. **Food trucks:** Mobil og fleksibel
3. **Fine dining:** Premium features og design
4. **Restaurant chains:** Multi-location og team

## 🚦 Risk Management

### Technical Risks
- **Firebase limits:** Migration plan til SQL
- **Scaling issues:** Horizontal scaling strategi
- **Data loss:** Daily backups, multi-region

### Business Risks
- **Competition:** Differensiering på UX og pris
- **Churn:** Proaktiv customer success
- **Regulation:** GDPR compliance fra dag 1

## 📚 Documentation Requirements

### Technical Docs
- API documentation (OpenAPI/Swagger)
- Database schema
- Architecture diagrams
- Deployment guides
- Troubleshooting guides

### User Docs
- Getting started guide
- Feature tutorials
- Video walkthroughs
- FAQ section
- API documentation for Silver/Gold

---

## ✅ Final Launch Readiness Checklist

### Kritiske Elementer (Må ha)
- [ ] Fullt funksjonell meny-editor
- [ ] QR-kode generering fungerer
- [ ] Betalingsintegrasjon aktiv
- [ ] Mobile-responsive design
- [ ] Basic analytics tracking
- [ ] User authentication sikker
- [ ] GDPR compliant
- [ ] Backup system aktivt

### Viktige Elementer (Bør ha)
- [ ] Onboarding flow optimalisert
- [ ] Email notifications fungerer
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] A/B testing framework
- [ ] Customer support system

### Nice-to-Have
- [ ] API for integrasjoner
- [ ] White-label options
- [ ] Advanced theming
- [ ] Team collaboration
- [ ] Scheduled updates

---

**Siste oppdatert:** November 2024
**Versjon:** 1.0.0
**Status:** Ready for Development