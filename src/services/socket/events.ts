import type { Order, User } from '../../types';

export interface OrderUpdatePayload {
  orderId: string;
  status: Order['status'];
}

export interface SocketEvents {
  // Server -> Client events
  orders_updated: (orders: Order[]) => void;
  order_status_changed: (order: Order) => void;
  login_success: (user: User) => void;
  connect_error: (error: Error) => void;

  // Client -> Server events
  new_order: (order: Order) => void;
  update_order_status: (payload: OrderUpdatePayload) => void;
  user_login: (user: User) => void;
  get_orders: () => void;
}