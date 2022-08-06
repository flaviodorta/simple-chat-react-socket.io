export interface UserInitialState {
  socketId: string;
  avatarUrl: string;
  roomId: string;
  username: string;
}

export const usersInitialState: UserInitialState = {
  socketId: '',
  avatarUrl: '',
  roomId: '',
  username: '',
};
