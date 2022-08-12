import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { usersInitialState } from './user.state';

export const userSlice = createSlice({
  name: 'User State',
  initialState: usersInitialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },

    setRoomId(state, action: PayloadAction<string>) {
      state.roomId = action.payload;
    },

    setAvatarUrl(state, action: PayloadAction<string>) {
      state.avatarUrl = action.payload;
    },

    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
});
