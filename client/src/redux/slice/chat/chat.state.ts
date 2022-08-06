import { Message, User } from '../../../types/types';

export interface ChatInitialState {
  messages: Message[];
  users: User[];
}

export const chatInitialState: ChatInitialState = {
  messages: [],
  users: [],
};
