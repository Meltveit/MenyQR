import { User as FirebaseUser } from "firebase/auth";

export interface User extends Partial<FirebaseUser> {
  tier?: 'Freemium' | 'Bronze' | 'Silver' | 'Gold';
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  allergens: string[];
};

export type MenuCategory = {
  id: string;
  name:string;
  items: MenuItem[];
};

export type Menu = {
  id: string;
  name: string;
  description: string;
  categories: MenuCategory[];
  restaurantId: string;
  lastUpdated: string;
};

export type Tier = {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  cta: string;
  isMostPopular?: boolean;
};

export type AnalyticsData = {
  totalViews: number;
  viewsByDay: { day: string; views: number }[];
  topItems: { name: string; clicks: number }[];
};
