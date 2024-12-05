import io from 'socket.io-client';
import { config } from '../../config';
import type { SocketEvents } from './events';

export const socket = io(config.wsUrl, {
  withCredentials: true,
  transports: ['websocket', 'polling']
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