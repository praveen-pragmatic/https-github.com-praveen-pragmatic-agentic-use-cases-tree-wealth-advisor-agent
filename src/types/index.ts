export interface User {
  id: string;
  name: string;
  mobile: string;
  role: 'admin' | 'user';
  preferences: {
    tasteProfile?: {
      sweet: number;
      sour: number;
      bitter: number;
      strong: number;
    };
  };
}

export interface Cocktail {
  id: string;
  name: string;
  description: string;
  spirit: string;
  price: number;
  available: boolean;
  tasteProfile: {
    sweet: number;
    sour: number;
    bitter: number;
    strong: number;
  };
  ingredients: string[];
  imageUrl: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'salads' | 'entrees' | 'mains' | 'desserts';
  available: boolean;
  imageUrl: string;
  isSpicy?: boolean;
  isVegetarian?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  cocktailId?: string;
  cocktailName?: string;
  menuItemId?: string;
  menuItemName?: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  timestamp: string;
  specialInstructions?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    value: Partial<TasteProfile>;
  }[];
}

export interface TasteProfile {
  sweet: number;
  sour: number;
  bitter: number;
  strong: number;
}