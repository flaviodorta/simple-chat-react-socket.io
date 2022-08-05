import React, { createContext, useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface UserRefs {
  socketId: string;
  username: string;
  roomId: string;
  avatarUrl: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  setSocketId: React.Dispatch<React.SetStateAction<string>>;
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserRefs>({
  socketId: '',
  username: '',
  roomId: '',
  avatarUrl: '',
  setUsername: () => {},
  setRoomId: () => {},
  setSocketId: () => {},
  setAvatarUrl: () => {},
});

export const useUserContext = () => useContext(UserContext);

export function UserProvider(props: Props) {
  const [socketId, setSocketId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  return (
    <UserContext.Provider
      value={{
        socketId,
        username,
        roomId,
        avatarUrl,
        setSocketId,
        setUsername,
        setRoomId,
        setAvatarUrl,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
