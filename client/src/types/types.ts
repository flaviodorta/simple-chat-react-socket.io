import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/global.store';
import { JOIN_ROOM } from '../utils/constants';

export interface ServerToClientEvents {}

export interface ClientToServerEvents {
  [JOIN_ROOM]: ({
    username,
    roomId,
  }: {
    username: string;
    roomId: string;
  }) => void;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export interface User {
  socketId: string;
  avatarUrl: string;
  username: string;
  roomId: string;
}

export interface Message {
  avatarUrl: string;
  username: string;
  messageContent: string;
}

export interface ContextProviderProps {
  children: React.ReactNode;
}
