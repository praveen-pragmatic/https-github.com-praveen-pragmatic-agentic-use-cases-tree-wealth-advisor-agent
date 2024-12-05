import { socket } from './socket';
import type { Order, User } from '../../types';
import type { OrderUpdatePayload } from './events';

export const socketEmitters = {
  newOrder: (order: Order) => 
    socket.emit('new_order', order),
  
  updateOrderStatus: (payload: OrderUpdatePayload) => 
    socket.emit('update_order_status', payload),
  
  userLogin: (user: User) => 
    socket.emit('user_login', user)
};