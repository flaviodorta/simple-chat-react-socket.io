import React, { createContext, useContext } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import { ContextProviderProps } from '../types/types';

interface Props {
  children: React.ReactNode;
}

interface UserContextProps {
  socketId: string;
  avatarUrl: string;
  username: string;
  roomId: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  setSocketId: React.Dispatch<React.SetStateAction<string>>;
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextProps>({
  socketId: '',
  avatarUrl: '',
  username: '',
  roomId: '',
  setUsername: () => {},
  setRoomId: () => {},
  setAvatarUrl: () => {},
  setSocketId: () => {},
});

export const useUserContext = () => useContext(UserContext);

export function UserProvider(props: ContextProviderProps) {
  const [username, setUsername] = usePersistedState<string>('username', '');
  const [roomId, setRoomId] = usePersistedState<string>('roomId', '');
  const [socketId, setSocketId] = usePersistedState<string>('socketId', '');
  const [avatarUrl, setAvatarUrl] = usePersistedState<string>('avatarUrl', '');

  return (
    <UserContext.Provider
      value={{
        socketId,
        avatarUrl,
        username,
        roomId,
        setUsername,
        setRoomId,
        setSocketId,
        setAvatarUrl,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
