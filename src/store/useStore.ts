import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Cocktail, Order, MenuItem } from '../types';
import { socketEmitters } from '../services/socket';
import { cocktails as initialCocktails } from '../data/cocktails';
import { menuItems as initialMenuItems } from '../data/menuItems';

interface Store {
  user: User | null;
  users: User[];
  orders: Order[];
  cocktails: Cocktail[];
  menuItems: MenuItem[];
  setUser: (user: User | null) => void;
  setUsers: (users: User[] | ((prev: User[]) => User[])) => void;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  hasActiveOrder: (userId: string) => boolean;
  toggleItemAvailability: (itemId: string, type: 'cocktail' | 'menuItem') => void;
  addMenuItem: (item: MenuItem) => void;
  addCocktail: (cocktail: Cocktail) => void;
  deleteMenuItem: (itemId: string, type: 'cocktail' | 'menuItem') => void;
  updateMenuItem: (item: MenuItem | Cocktail) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      orders: [],
      cocktails: initialCocktails,
      menuItems: initialMenuItems,
      
      setUser: (user) => {
        set({ user });
        if (user) {
          socketEmitters.userLogin(user);
        }
      },

      setUsers: (users) => {
        set((state) => ({
          users: typeof users === 'function' ? users(state.users) : users,
        }));
      },
      
      setOrders: (orders) => {
        console.log('Setting orders:', orders);
        set({ orders: orders.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )});
      },
      
      addOrder: (order) => {
        console.log('Adding new order:', order);
        socketEmitters.newOrder(order);
      },

      updateOrder: (updatedOrder) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          ),
        }));
      },
      
      updateOrderStatus: (orderId, status) => {
        console.log('Updating order status:', orderId, status);
        socketEmitters.updateOrderStatus({ orderId, status });
      },
      
      hasActiveOrder: (userId) => {
        return get().orders.some(
          order => order.userId === userId && 
          !['delivered', 'cancelled'].includes(order.status)
        );
      },

      toggleItemAvailability: (itemId, type) => {
        set((state) => {
          if (type === 'cocktail') {
            return {
              cocktails: state.cocktails.map(item =>
                item.id === itemId ? { ...item, available: !item.available } : item
              )
            };
          } else {
            return {
              menuItems: state.menuItems.map(item =>
                item.id === itemId ? { ...item, available: !item.available } : item
              )
            };
          }
        });
      },

      addMenuItem: (item) => {
        set((state) => ({
          menuItems: [...state.menuItems, item]
        }));
      },

      addCocktail: (cocktail) => {
        set((state) => ({
          cocktails: [...state.cocktails, cocktail]
        }));
      },

      deleteMenuItem: (itemId, type) => {
        set((state) => {
          if (type === 'cocktail') {
            return {
              cocktails: state.cocktails.filter(item => item.id !== itemId)
            };
          } else {
            return {
              menuItems: state.menuItems.filter(item => item.id !== itemId)
            };
          }
        });
      },

      updateMenuItem: (updatedItem) => {
        set((state) => {
          if ('spirit' in updatedItem) {
            return {
              cocktails: state.cocktails.map(item =>
                item.id === updatedItem.id ? updatedItem as Cocktail : item
              )
            };
          } else {
            return {
              menuItems: state.menuItems.map(item =>
                item.id === updatedItem.id ? updatedItem as MenuItem : item
              )
            };
          }
        });
      },
    }),
    {
      name: 'spiritz-storage',
      partialize: (state) => ({
        user: state.user,
        users: state.users,
        cocktails: state.cocktails,
        menuItems: state.menuItems,
      }),
    }
  )
);