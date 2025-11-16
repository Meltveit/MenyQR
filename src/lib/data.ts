import type { User, Menu, Tier, AnalyticsData } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const mockUser: User = {
  id: 'user-123',
  displayName: 'Espresso House',
  email: 'manager@espressohouse.no',
  photoURL: PlaceHolderImages.find(p => p.id === 'restaurant-logo-placeholder')?.imageUrl,
  tier: 'Silver',
};

export const pricingTiers: Tier[] = [
  {
    id: 'freemium',
    name: 'Freemium',
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      '1 meny',
      'Opptil 2 kategorier',
      'Maks 7 retter totalt',
      'Standard design-tema',
      'Enkel statistikk (totale visninger)',
      '1 lokasjon',
    ],
    cta: 'Start Gratis',
  },
  {
    id: 'bronze',
    name: 'Bronze',
    priceMonthly: 80,
    priceYearly: 768,
    features: [
      'Alt i Freemium, pluss:',
      'Opptil 3 kategorier',
      'Ubegrenset antall retter',
      'Basis tilpasning (5-10 temaer, logo)',
      'QR-kode nedlasting (PDF)',
    ],
    cta: 'Velg Bronze',
  },
  {
    id: 'silver',
    name: 'Silver',
    priceMonthly: 129,
    priceYearly: 1238,
    isMostPopular: true,
    features: [
      'Alt i Bronze, pluss:',
      'Ubegrenset kategorier & menyer',
      'Full tilpasning (farger, bakgrunn)',
      'Detaljert statistikk (klikk per rett)',
      'Månedlige e-postrapporter',
      'Støtte for 2-5 lokasjoner',
    ],
    cta: 'Velg Silver',
  },
  {
    id: 'gold',
    name: 'Gold',
    priceMonthly: 189,
    priceYearly: 1814,
    features: [
      'Kommer snart!',
      'Alt i Silver, pluss:',
      'White-label løsning',
      'Team-tilgang',
      'Betalingsintegrasjon (Stripe)',
      'Ubegrenset lokasjoner',
    ],
    cta: 'Kommer Snart',
  },
];

export const mockMenus: Menu[] = [
  {
    id: 'menu-1',
    name: 'Vintermeny',
    description: 'Varme drikker og deilige bakevarer for den kalde årstiden.',
    restaurantId: 'user-123',
    lastUpdated: '2 dager siden',
    categories: [
      {
        id: 'cat-1',
        name: 'Kaffe',
        items: [
          { id: 'item-1', name: 'Cappuccino', description: 'En klassisk italiensk kaffedrikk.', price: 45, imageUrl: PlaceHolderImages.find(p => p.id === 'menu-item-coffee')?.imageUrl, allergens: ['Melk'] },
          { id: 'item-2', name: 'Americano', description: 'Espresso med varmt vann.', price: 38, allergens: [] },
        ],
      },
      {
        id: 'cat-2',
        name: 'Mat',
        items: [
          { id: 'item-3', name: 'Burger', description: 'Saftig burger med ost og bacon.', price: 159, imageUrl: PlaceHolderImages.find(p => p.id === 'menu-item-burger')?.imageUrl, allergens: ['Gluten', 'Melk', 'Sennep'] },
          { id: 'item-4', name: 'Salat', description: 'Frisk salat med kylling og avokado.', price: 129, imageUrl: PlaceHolderImages.find(p => p.id === 'menu-item-salad')?.imageUrl, allergens: ['Sennep'] },
        ],
      },
    ],
  },
  {
    id: 'menu-2',
    name: 'Sommermeny',
    description: 'Forfriskende drikker og lette retter.',
    restaurantId: 'user-123',
    lastUpdated: '1 måned siden',
    categories: [
        {
            id: 'cat-3',
            name: 'Drikke',
            items: [
              { id: 'item-5', name: 'Iskaffe', description: 'Kald og forfriskende.', price: 52, allergens: ['Melk'] },
            ],
          },
          {
            id: 'cat-4',
            name: 'Søtt',
            items: [
                { id: 'item-6', name: 'Kanelbolle', description: 'Hjemmelaget og nystekt.', price: 35, allergens: ['Gluten', 'Melk', 'Egg'] },
            ],
          }
    ],
  },
];

export const mockAnalytics: AnalyticsData = {
  totalViews: 1489,
  viewsByDay: [
    { day: 'Man', views: 150 },
    { day: 'Tir', views: 220 },
    { day: 'Ons', views: 250 },
    { day: 'Tor', views: 210 },
    { day: 'Fre', views: 350 },
    { day: 'Lør', views: 420 },
    { day: 'Søn', views: 380 },
  ].slice(0, new Date().getDay() +1),
  topItems: [
    { name: 'Cappuccino', clicks: 540 },
    { name: 'Burger', clicks: 410 },
    { name: 'Iskaffe', clicks: 320 },
    { name: 'Salat', clicks: 215 },
  ],
};
