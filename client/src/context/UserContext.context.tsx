import { createContext, MutableRefObject, useContext, useRef } from 'react';

interface Props {
  children: React.ReactNode;
}

interface UserRefs {
  socketIdRef: MutableRefObject<string | undefined>;
  roomIdRef: MutableRefObject<string>;
  usernameRef: MutableRefObject<string>;
}

const UserContext = createContext<UserRefs>({
  socketIdRef: { current: '' },
  roomIdRef: { current: '' },
  usernameRef: { current: '' },
});

export const useUserContext = () => useContext(UserContext);

export function UserProvider(props: Props) {
  const usernameRef = useRef('');
  const socketIdRef = useRef('');
  const roomIdRef = useRef('');
  

  return (
    <UserContext.Provider
      value={{
        socketIdRef,
        roomIdRef,
        usernameRef,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
