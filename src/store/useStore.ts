import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, Cocktail, Order, MenuItem } from '../types';
import { socketEmitters } from '../services/socket';
import { getOrdersByStatus, hasActiveOrder, getUserById, getCocktailById } from '../utils/orderUtils';

interface Store {
  user: User | null;
  users: User[];
  cocktails: Cocktail[];
  orders: Order[];
  menuItems: MenuItem[];
  setUser: (user: User | null) => void;
  setUsers: (users: User[] | ((prev: User[]) => User[])) => void;
  setOrders: (orders: Order[]) => void;
  setCocktails: (cocktails: Cocktail[]) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  hasActiveOrder: (userId: string) => boolean;
  getOrdersByStatus: () => ReturnType<typeof getOrdersByStatus>;
  getUserById: (userId: string) => User | undefined;
  getCocktailById: (cocktailId: string) => Cocktail | undefined;
}

const initialState = {
  user: null,
  users: [],
  cocktails: [
    {
      id: '1',
      name: 'Classic Mojito',
      description: 'Fresh mint, lime juice, rum, and soda water',
      spirit: 'rum',
      price: 12.99,
      available: true,
      tasteProfile: {
        sweet: 3,
        sour: 4,
        bitter: 1,
        strong: 3,
      },
      ingredients: ['White rum', 'Fresh mint', 'Lime juice', 'Sugar', 'Soda water'],
      imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a',
    }
  ],
  orders: [],
  menuItems: []
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setUser: (user) => {
        set((state) => ({
          ...state,
          user,
          users: user 
            ? [...state.users.filter(u => u.id !== user.id), user] 
            : state.users
        }));
        if (user) {
          socketEmitters.userLogin(user);
        }
      },

      setUsers: (users) => {
        set((state) => ({
          ...state,
          users: typeof users === 'function' ? users(state.users) : users,
        }));
      },
      
      setOrders: (orders) => {
        set((state) => ({ ...state, orders }));
      },
      
      setCocktails: (cocktails) => {
        set((state) => ({ ...state, cocktails }));
      },
      
      addOrder: (order) => {
        socketEmitters.newOrder(order);
        set((state) => ({ ...state, orders: [...state.orders, order] }));
      },
      
      updateOrderStatus: (orderId, status) => {
        socketEmitters.updateOrderStatus({ orderId, status });
        set((state) => ({
          ...state,
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },
      
      hasActiveOrder: (userId) => hasActiveOrder(get().orders, userId),
      getOrdersByStatus: () => getOrdersByStatus(get().orders),
      getUserById: (userId) => getUserById(get().users, userId),
      getCocktailById: (cocktailId) => getCocktailById(get().cocktails, cocktailId),
    }),
    {
      name: 'spiritz-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        users: state.users,
        orders: state.orders,
        cocktails: state.cocktails,
        menuItems: state.menuItems,
      }),
    }
  )
);