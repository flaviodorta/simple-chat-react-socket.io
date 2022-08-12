import { AppThunk } from '../../types/types';

import { chatActions, userActions } from '../global.store';

export const resetState = (): AppThunk => {
  return (dispatch, getState) => {
    dispatch(chatActions.setMessages([]));
    dispatch(chatActions.setUsers([]));
    dispatch(userActions.setAvatarUrl(''));
    dispatch(userActions.setRoomId(''));
    dispatch(userActions.setUsername(''));
  };
};
