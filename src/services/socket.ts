import io from 'socket.io-client';
import { config } from '../config';

// Initialize Socket.IO client with configuration
export const socket = io(config.wsUrl, {
  withCredentials: true,
  transports: ['websocket', 'polling']
});

// Socket event types
export interface OrderUpdatePayload {
  orderId: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
}

// Typed event emitters
export const socketEmitters = {
  newOrder: (order: any) => socket.emit('new_order', order),
  updateOrderStatus: (payload: OrderUpdatePayload) => 
    socket.emit('update_order_status', payload),
  userLogin: (user: any) => socket.emit('user_login', user)
};

// Typed event listeners
export const createSocketListeners = (handlers: {
  onOrdersUpdated: (orders: any[]) => void;
  onLoginSuccess: (user: any) => void;
  onError: (error: Error) => void;
}) => {
  socket.on('orders_updated', handlers.onOrdersUpdated);
  socket.on('login_success', handlers.onLoginSuccess);
  socket.on('connect_error', handlers.onError);

  return () => {
    socket.off('orders_updated', handlers.onOrdersUpdated);
    socket.off('login_success', handlers.onLoginSuccess);
    socket.off('connect_error', handlers.onError);
  };
};