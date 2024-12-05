import type { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Salads & Dips
  {
    id: 'salad-1',
    name: 'The Capresse Salad',
    description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
    price: 0,
    category: 'salads',
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5',
    isVegetarian: true,
  },
  {
    id: 'salad-2',
    name: 'Coin Pita with Dips',
    description: 'Warm pita coins served with hummus, baba ganoush, and toum',
    price: 0,
    category: 'salads',
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435',
    isVegetarian: true,
  },
  // ... rest of the menu items with price: 0
];