export interface UserInitialState {
  roomId?: string;
  avatarUrl: string;
  username: string;
}

export const usersInitialState: UserInitialState = {
  roomId: '',
  avatarUrl: '',
  username: '',
};
