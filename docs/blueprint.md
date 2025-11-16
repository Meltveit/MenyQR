# **App Name**: MenyQR

## Core Features:

- User Registration and Onboarding: Allow restaurants to register and select a subscription tier (Freemium, Bronze, Silver). Integrates with Firebase Authentication (email/password, Google OAuth).
- Menu Management Dashboard: Provides a central dashboard for restaurants to manage their digital menus, analytics, settings, and subscription. Uses a drag-and-drop interface for menu building.
- QR Code Generation: Automatically generate QR codes for each menu, downloadable in PNG/PDF formats.
- Real-time Menu Preview: Offer a real-time preview of the menu as it is being edited, reflecting changes instantly using Firestore listeners.
- Customer Menu View: Display the menu as a responsive web page when the QR code is scanned, with tabs for categories and item details (image, price, description, allergens).
- Analytics Tracking and Reporting: Track menu views anonymously using Firestore and Firebase Functions, and provide monthly email reports to restaurants.
- Tier-based Feature Access: Implement feature restrictions based on the user's subscription tier, managed via user roles in Firestore and enforced in the API routes.

## Style Guidelines:

- Primary color: Fresh green (#4CAF50) to evoke freshness and environmental friendliness.
- Secondary color: Trustworthy blue (#2196F3) for navigation elements.
- Accent color: Attention-grabbing orange (#FF5722) for calls to action, especially upsell buttons.
- Neutral colors: Clean white background (#FFFFFF), light gray sections (#F5F5F5), and readable dark gray text (#333333).
- Font: 'Inter' (sans-serif) for a clean and modern look across all text elements.
- Dashboard: Collapsible left sidebar for navigation; main grid for menu cards. Responsive breakpoints for different devices.
- Menu Editor: Horizontal layout with a custom panel on the left, a drag-and-drop area in the center, and a mobile preview on the right.
- Public Menu: Full-screen scrollable view with a logo header, categorized tabs (swipeable), and a detailed item display.