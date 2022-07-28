import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { RECONNECT_DELAY, URL_SERVER } from '../constants/constants';

export function useSocketIo() {
  const [s, ss] = useState<Socket | null>(null);

  useEffect(() => {
    if (!s) {
      const socket = io(URL_SERVER);
      ss(socket);
      socket.on('connect', () => {
        console.log(socket.id);
      });
      socket.on('connect_error', () => {
        setTimeout(() => socket.connect(), RECONNECT_DELAY);
      });
    }
  }, [s]);

  return s;
}
