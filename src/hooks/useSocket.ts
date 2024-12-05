import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { socket } from '../services/socket';
import type { Order } from '../types';

interface UseSocketProps {
  onOrderStatusChanged?: (order: Order) => void;
}

export function useSocket({ onOrderStatusChanged }: UseSocketProps = {}) {
  const setOrders = useStore((state) => state.setOrders);
  const updateOrder = useStore((state) => state.updateOrder);
  const setUsers = useStore((state) => state.setUsers);

  useEffect(() => {
    // Request initial orders on connection
    socket.emit('get_orders');

    // Order updates
    socket.on('orders_updated', (orders) => {
      console.log('Orders updated:', orders);
      setOrders(orders);
    });

    // Individual order status updates
    socket.on('order_status_changed', (order) => {
      console.log('Order status changed:', order);
      updateOrder(order);
      onOrderStatusChanged?.(order);
    });

    // User updates
    socket.on('login_success', (user) => {
      console.log('User login success:', user);
      setUsers((prevUsers) => [...prevUsers.filter(u => u.id !== user.id), user]);
    });

    // Error handling
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return () => {
      socket.off('orders_updated');
      socket.off('order_status_changed');
      socket.off('login_success');
      socket.off('connect_error');
    };
  }, [setOrders, updateOrder, setUsers, onOrderStatusChanged]);
}