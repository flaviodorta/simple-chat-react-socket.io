import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, User } from '../../../types/types';
import { chatInitialState } from './chat.state';

export const chatSlice = createSlice({
  name: 'Chat State',
  initialState: chatInitialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },

    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },

    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },

    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
  },
});
