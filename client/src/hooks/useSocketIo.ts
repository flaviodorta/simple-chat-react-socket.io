import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { RECONNECT_DELAY, URL_SERVER } from '../utils/constants';

export function useSocketIo() {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    const connectedSocket = io(URL_SERVER);
    socket.current = connectedSocket;
    connectedSocket.on('connect', () => {
      console.log(connectedSocket.id);
    });
    connectedSocket.on('connect_error', () => {
      setTimeout(() => connectedSocket.connect(), RECONNECT_DELAY);
    });
  }, []);

  return socket.current;
}
