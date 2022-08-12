import { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { ContextProviderProps } from '../types/types';
import { RECONNECT_DELAY, URL_SERVER } from '../utils/constants';

interface Context {
  socket: Socket | null;
}

const SocketIoContext = createContext<Context>({
  socket: null,
});

export const useSocketIoContext = () => useContext(SocketIoContext);

const socket = io(URL_SERVER);

socket.on('connect', () => {
  console.log(socket.id);
});

socket.on('connect_error', () => {
  setTimeout(() => socket.connect(), RECONNECT_DELAY);
});

export const SocketIoProvider = (props: ContextProviderProps): JSX.Element => {
  return (
    <SocketIoContext.Provider value={{ socket }}>
      {props.children}
    </SocketIoContext.Provider>
  );
};
