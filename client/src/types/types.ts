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
