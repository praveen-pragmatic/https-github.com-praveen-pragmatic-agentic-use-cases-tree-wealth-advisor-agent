import io from 'socket.io-client';
import { config } from '../../config';
import type { SocketEvents } from './events';

// Ensure we're using secure WebSocket in production
const wsUrl = config.wsUrl.replace('http://', window.location.protocol === 'https:' ? 'wss://' : 'ws://');

export const socket = io(wsUrl, {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  timeout: 20000,
  autoConnect: true
}) as unknown as SocketIOClient.Socket & {
  emit: <Ev extends keyof SocketEvents>(
    event: Ev,
    ...args: Parameters<SocketEvents[Ev]>
  ) => void;
  on: <Ev extends keyof SocketEvents>(
    event: Ev,
    listener: SocketEvents[Ev]
  ) => void;
  off: <Ev extends keyof SocketEvents>(
    event: Ev,
    listener: SocketEvents[Ev]
  ) => void;
};

// Add connection event listeners
socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('connect_error', (error) => {
  console.error('WebSocket connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected from WebSocket server:', reason);
  // Attempt to reconnect on disconnect
  socket.connect();
});

// Handle reconnection
socket.on('reconnect', (attemptNumber) => {
  console.log('Reconnected to WebSocket server after', attemptNumber, 'attempts');
});

socket.on('reconnect_error', (error) => {
  console.error('WebSocket reconnection error:', error);
});

socket.on('reconnect_failed', () => {
  console.error('WebSocket reconnection failed after all attempts');
});

// Ensure socket is connected
if (!socket.connected) {
  socket.connect();
}