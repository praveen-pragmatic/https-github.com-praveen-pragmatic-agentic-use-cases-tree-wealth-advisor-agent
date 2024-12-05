import type { Cocktail } from '../types';

export const cocktails: Cocktail[] = [
  {
    id: 'mojito',
    name: 'Classic Mojito',
    description: 'Fresh mint, lime juice, white rum, and soda water',
    spirit: 'rum',
    price: 0,
    available: true,
    tasteProfile: {
      sweet: 3,
      sour: 4,
      bitter: 1,
      strong: 3,
    },
    ingredients: ['White rum', 'Fresh mint', 'Lime juice', 'Sugar', 'Soda water'],
    imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a',
  },
  {
    id: 'margarita',
    name: 'Traditional Margarita',
    description: 'Tequila, fresh lime juice, and triple sec with a salted rim',
    spirit: 'tequila',
    price: 0,
    available: true,
    tasteProfile: {
      sweet: 2,
      sour: 5,
      bitter: 1,
      strong: 4,
    },
    ingredients: ['Tequila', 'Triple sec', 'Lime juice', 'Salt'],
    imageUrl: 'https://images.unsplash.com/photo-1544145945-f90425340c7e',
  },
  // ... rest of the cocktails with price: 0
];