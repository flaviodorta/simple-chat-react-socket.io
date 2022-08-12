export interface UserInitialState {
  userId: string;
  roomId: string;
  avatarUrl: string;
  username: string;
}

export const usersInitialState: UserInitialState = {
  userId: '',
  roomId: '',
  avatarUrl: '',
  username: '',
};
