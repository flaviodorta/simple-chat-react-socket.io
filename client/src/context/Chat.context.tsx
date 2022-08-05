import { createContext, useContext } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import { ContextProviderProps, User } from '../types/types';

interface ChatContextProps {
  messages: string[];
  users: User[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const ChatContext = createContext<ChatContextProps>({
  messages: [],
  users: [],
  setMessages: () => {},
  setUsers: () => {},
});

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = (props: ContextProviderProps): JSX.Element => {
  const [messages, setMessages] = usePersistedState<string[]>('messages', []);
  const [users, setUsers] = usePersistedState<User[]>('users', []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        users,
        setMessages,
        setUsers,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
