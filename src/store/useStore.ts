import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Cocktail, Order, MenuItem } from '../types';
import { socketEmitters } from '../services/socket';
import { cocktails } from '../data/cocktails';

interface Store {
  user: User | null;
  users: User[];
  orders: Order[];
  setUser: (user: User | null) => void;
  setUsers: (users: User[] | ((prev: User[]) => User[])) => void;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  hasActiveOrder: (userId: string) => boolean;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      orders: [],
      
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
    }),
    {
      name: 'spiritz-storage',
      partialize: (state) => ({
        user: state.user,
        users: state.users,
      }),
    }
  )
);