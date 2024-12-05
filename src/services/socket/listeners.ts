import { socket } from './socket';
import type { Order, User } from '../../types';

interface SocketListenerHandlers {
  onOrdersUpdated: (orders: Order[]) => void;
  onLoginSuccess: (user: User) => void;
  onError: (error: Error) => void;
}

export const createSocketListeners = (handlers: SocketListenerHandlers) => {
  socket.on('orders_updated', handlers.onOrdersUpdated);
  socket.on('login_success', handlers.onLoginSuccess);
  socket.on('connect_error', handlers.onError);

  return () => {
    socket.off('orders_updated', handlers.onOrdersUpdated);
    socket.off('login_success', handlers.onLoginSuccess);
    socket.off('connect_error', handlers.onError);
  };
};