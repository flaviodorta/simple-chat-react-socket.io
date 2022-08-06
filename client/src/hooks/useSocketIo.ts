import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { userActions } from '../redux/global.store';
import { RECONNECT_DELAY, URL_SERVER } from '../utils/constants';

export const useSocketIo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const connectedSocket = io(URL_SERVER);
    dispatch(userActions.setSocketId(connectedSocket.id));
    connectedSocket.on('connect', () => {
      console.log(connectedSocket.id);
    });
    connectedSocket.on('connect_error', () => {
      setTimeout(() => connectedSocket.connect(), RECONNECT_DELAY);
    });
  }, []);
};
