import { createContext, useContext, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { RECONNECT_DELAY, URL_SERVER } from '../utils/constants';

interface Props {
  children: React.ReactNode;
}

interface Context {
  socket: Socket | null;
}

const SocketIoContext = createContext<Context>({
  socket: null,
});

export const useSocketIoContext = () => useContext(SocketIoContext);

export function SocketIoProvider(props: Props): JSX.Element {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const connectedSocket = io(URL_SERVER);
    socketRef.current = connectedSocket;
    connectedSocket.on('connect', () => {
      console.log(connectedSocket.id);
    });
    connectedSocket.on('connect_error', () => {
      setTimeout(() => connectedSocket.connect(), RECONNECT_DELAY);
    });
  }, []);

  return (
    <SocketIoContext.Provider value={{ socket: socketRef.current }}>
      {props.children}
    </SocketIoContext.Provider>
  );
}
