import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { socket, createSocketListeners } from '../services/socket';

export function useSocket() {
  const setOrders = useStore((state) => state.setOrders);
  const setUsers = useStore((state) => state.setUsers);

  useEffect(() => {
    // Ensure socket is connected
    if (!socket.connected) {
      socket.connect();
    }

    const cleanup = createSocketListeners({
      onOrdersUpdated: (orders) => {
        console.log('Orders updated:', orders);
        setOrders(orders);
      },
      onLoginSuccess: (user) => {
        console.log('User login success:', user);
        setUsers((prevUsers) => [...prevUsers.filter(u => u.id !== user.id), user]);
      },
      onError: (error) => {
        console.error('Socket connection error:', error);
      }
    });

    return () => {
      cleanup();
      // Don't disconnect socket on cleanup to maintain connection
    };
  }, [setOrders, setUsers]);
}