import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { RECONNECT_DELAY, URL_SERVER } from '../utils/constants';

export function useSocketIo() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socket) {
      const connectedSocket = io(URL_SERVER);
      setSocket(connectedSocket);
      connectedSocket.on('connect', () => {
        console.log(connectedSocket.id);
      });
      connectedSocket.on('connect_error', () => {
        setTimeout(() => connectedSocket.connect(), RECONNECT_DELAY);
      });
    }
  }, [socket]);

  return socket;
}
