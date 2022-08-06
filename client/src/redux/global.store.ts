import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slice/users/user.slice';
import { chatSlice } from './slice/chat/chat.slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export const userActions = userSlice.actions;
export const chatActions = chatSlice.actions;
