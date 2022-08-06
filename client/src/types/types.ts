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

export interface User {
  socketId: string;
  username: string;
  roomId: string;
}

export interface Message {
  avatarUrl: string;
  username: string;
  content: string;
}

export interface ContextProviderProps {
  children: React.ReactNode;
}
