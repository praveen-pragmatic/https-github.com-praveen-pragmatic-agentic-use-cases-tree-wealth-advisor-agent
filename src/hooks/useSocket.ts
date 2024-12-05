import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { createSocketListeners } from '../services/socket';

export function useSocket() {
  const setOrders = useStore((state) => state.setOrders);
  const setUsers = useStore((state) => state.setUsers);

  useEffect(() => {
    const cleanup = createSocketListeners({
      onOrdersUpdated: (orders) => {
        setOrders(orders);
      },
      onLoginSuccess: (user) => {
        setUsers((prevUsers) => [...prevUsers.filter(u => u.id !== user.id), user]);
      },
      onError: (error) => {
        console.error('Socket connection error:', error);
      }
    });

    return cleanup;
  }, [setOrders, setUsers]);
}