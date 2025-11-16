# claude.md - MenyQR Project Assistant Configuration

## Project Context

You are assisting with the development of MenyQR, a SaaS platform for digital restaurant menus with QR code integration. This document contains all project specifications, technical requirements, and implementation guidelines.

### Quick Facts
- **Project Name:** MenyQR
- **Type:** B2B SaaS Platform
- **Market:** Norway/Nordics (expanding globally)
- **Tech Stack:** Next.js 14, Firebase, Stripe, Tailwind CSS
- **Status:** Development Phase
- **Target Launch:** Q1 2025

## Core Instructions for Claude

When assisting with this project, always:

1. **Follow the established design system** - Use Emerald Green (#10B981) as primary color
2. **Respect tier limitations** - Implement feature gates based on subscription tiers
3. **Prioritize Norwegian market** - Default language is Norwegian, with i18n support
4. **Consider mobile-first** - All interfaces should be optimized for mobile devices
5. **Maintain security** - Follow Firebase security rules and GDPR compliance
6. **Use TypeScript** - All code should be strongly typed
7. **Follow file structure** - Respect the hierarchical structure defined in the project plan

## Project Architecture

### Database Structure
```
Collections:
- users (auth & subscription data)
- organizations (multi-location support)
- menus (menu data and settings)
- analytics (usage tracking)
- subscriptions (Stripe integration)
```

### API Endpoints
```
/api/auth/* - Authentication
/api/menus/* - Menu CRUD operations
/api/stripe/* - Payment processing
/api/analytics/* - Event tracking
/api/qr/* - QR generation
```

### Key Features by Tier

**Freemium (0 kr/mnd)**
- 1 menu, max 20 items
- Basic theme
- Standard QR code
- MenyQR branding

**Bronze (99 kr/mnd)**
- 3 menus, 50 items each
- 5 premium themes
- HD QR download
- Remove branding

**Silver (199 kr/mnd)**
- Unlimited menus/items
- Custom CSS
- API access
- Multi-location

**Gold (399 kr/mnd)**
- White-label
- Payment integration
- Team access
- Custom domain

## Code Examples

### Creating a Menu
```typescript
const menuData = {
  name: "Lunch Menu",
  organizationId: user.organizationId,
  theme: { template: "modern", primaryColor: "#10B981" },
  categories: [],
  settings: { showPrices: true, currency: "NOK" }
};
await createMenu(menuData);
```

### Checking Tier Limits
```typescript
const canUseFeature = (feature: string, userTier: string) => {
  const features = {
    freemium: ['basic_menu', 'qr_code'],
    bronze: ['themes', 'analytics', 'hd_qr'],
    silver: ['unlimited', 'api', 'custom_css'],
    gold: ['all_features']
  };
  return features[userTier]?.includes(feature);
};
```

### Analytics Tracking
```typescript
trackEvent('menu_viewed', {
  menuId: menu.id,
  source: 'qr_scan',
  device: detectDevice(userAgent)
});
```

## SEO Keywords to Target

Primary (Norway):
- digital meny (720 searches/month)
- qr meny (590 searches/month)
- elektronisk meny (480 searches/month)

Long-tail:
- "lage digital meny restaurant gratis"
- "qr kode meny norsk"
- "miljøvennlig restaurant meny"

## Common Tasks

### Task: Add New Feature
1. Check tier limitations in `/src/constants/features.ts`
2. Implement feature with proper TypeScript types
3. Add feature flag check using `useSubscription` hook
4. Update Firestore security rules if needed
5. Add analytics tracking
6. Test across all tiers

### Task: Create New Page
1. Add route in `/src/app/[locale]/`
2. Implement i18n with `next-intl`
3. Add SEO metadata
4. Ensure mobile responsiveness
5. Add to sitemap
6. Track page views

### Task: Implement Stripe Webhook
1. Add handler in `/src/app/api/stripe/webhook/`
2. Verify signature with `stripe.webhooks.constructEvent`
3. Update user subscription in Firestore
4. Send confirmation email
5. Log event for debugging

## Error Handling Patterns

```typescript
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (error) {
  console.error('[ComponentName] Error:', error);
  trackError(error);
  return { 
    success: false, 
    error: 'User-friendly error message' 
  };
}
```

## Testing Requirements

### Unit Tests
- All utility functions
- Custom hooks
- API endpoints
- Tier limit checks

### E2E Tests
- Registration flow
- Menu creation
- Payment flow
- QR generation
- Public menu view

## Performance Targets
- Lighthouse Score: >90
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Bundle Size: <200KB (initial)

## Security Checklist
- [ ] Firebase rules restrict data access
- [ ] Input validation on all forms
- [ ] Rate limiting on API endpoints
- [ ] Stripe webhook verification
- [ ] GDPR compliance
- [ ] XSS prevention
- [ ] Environment variables secured

## Deployment Process

```bash
# Development
npm run dev

# Testing
npm run test
npm run test:e2e

# Build
npm run build
npm run analyze

# Deploy
firebase deploy --only hosting
firebase deploy --only firestore:rules
```

## Support & Documentation

When implementing features, always consider:
1. **User Experience** - Simple, intuitive, mobile-first
2. **Performance** - Lazy load, optimize images, cache data
3. **Accessibility** - WCAG 2.1 AA compliance
4. **Internationalization** - Support for no, en, sv, da, fi
5. **Analytics** - Track all important user actions
6. **Error Recovery** - Graceful error handling with user feedback

## Common Troubleshooting

### Firebase Issues
- Check security rules
- Verify API keys
- Ensure indexes are created

### Stripe Issues
- Verify webhook endpoint
- Check webhook secret
- Ensure products/prices exist

### Performance Issues
- Analyze bundle size
- Check for memory leaks
- Optimize Firestore queries
- Implement pagination

## Project Milestones

- [x] Project setup and structure
- [ ] Authentication system
- [ ] Menu CRUD operations
- [ ] QR code generation
- [ ] Payment integration
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Beta testing
- [ ] Public launch

## Contact & Resources

- **GitHub:** github.com/[repo]
- **Staging:** staging.menyqr.no
- **Production:** menyqr.no
- **Documentation:** docs.menyqr.no
- **Support:** support@menyqr.no

---

## Quick Commands for Development

```bash
# Start development server
npm run dev

# Create new component
npm run generate:component [ComponentName]

# Run tests
npm test

# Check types
npm run type-check

# Format code
npm run format

# Build for production
npm run build

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

## Environment Variables Template

```env
# Copy to .env.local and fill in values
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

---

*This document should be your primary reference when working on MenyQR. Keep it updated as the project evolves.*