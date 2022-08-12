import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocketIoContext } from '../../context/SocketIo.context';
import { chatActions, RootState } from '../../redux/global.store';

import { User } from '../../types/types';

import { Box, Button } from '@mui/material';
import { UserCard } from './UserCard.component';
import { Message } from './Message.component';

export const Chat = (): JSX.Element => {
  const { socket } = useSocketIoContext();
  const dispatch = useDispatch();

  const {
    chat: { messages, users },
    user: { username, roomId, avatarUrl },
  } = useSelector((state: RootState) => state);

  const [messageContent, setMessageContent] = useState<string>('');

  const textFieldMessageRef = useRef<HTMLTextAreaElement>(null);

  const dispatchMessage = useCallback(
    (avatarUrl: string, username: string, content: string) => {
      dispatch(chatActions.addMessage({ avatarUrl, username, content }));
    },
    [dispatch]
  );

  useEffect(() => {
    console.log(messages);
  });

  useEffect(() => {
    socket?.emit('user join room', { roomId, avatarUrl, username });

    socket?.emit('user joined room', { roomId, avatarUrl, username });

    socket?.on(
      'user send message',
      ({ avatarUrl, username, messageContent }) => {
        dispatchMessage(avatarUrl, username, messageContent);
      }
    );
  }, []);

  useEffect(() => {
    socket?.on('user joined room', ({ avatarUrl, username }) => {
      console.log(`${username} joined the room`);

      dispatch(chatActions.addUser({ avatarUrl, username } as User));
    });

    socket?.on('users in the room', (users) => {
      dispatch(chatActions.setUsers([...users]));
    });
  }, []);

  const sendMessage = useCallback(() => {
    if (messageContent) {
      socket?.emit('user send message', {
        roomId,
        avatarUrl,
        username,
        messageContent,
      });
      dispatchMessage(avatarUrl, username, messageContent);
      setMessageContent('');
    }

    textFieldMessageRef.current?.focus();
  }, [
    messageContent,
    textFieldMessageRef,
    username,
    avatarUrl,
    socket,
    roomId,
    dispatchMessage,
  ]);

  const sendMessageOnEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  useEffect(() => {
    window.addEventListener('keypress', sendMessageOnEnter);

    return () => {
      window.removeEventListener('keypress', sendMessageOnEnter);
    };
  });

  const enterTextOnKeyPress = useCallback((e: KeyboardEvent) => {
    if (document.activeElement !== textFieldMessageRef.current) {
      if (e.key !== 'Enter') {
        textFieldMessageRef.current?.focus();
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keypress', enterTextOnKeyPress);

    return () => {
      window.removeEventListener('keypress', enterTextOnKeyPress);
    };
  });

  return (
    <Box
      sx={{
        width: '140rem',
        height: '80rem',
        padding: '1rem',
        backgroundColor: 'var(--white-three)',
        borderRadius: '1rem',
        boxShadow: 'var(--box-shadow)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        transform: 'translateY(-5%)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '89%',
          borderRadius: '0.5rem',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '84.5%',
            height: '100%',
            backgroundColor: 'var(--white-one)',
            borderRadius: '0.5rem 0 0 0.5rem',
            padding: '2rem 1rem 2rem 1rem',
            overflowY: 'scroll',
          }}
        >
          {messages.map((message, idx) => (
            <Message
              key={idx}
              avatarUrl={message.avatarUrl}
              username={message.username}
              content={message.content}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '15%',
            height: '100%',
            backgroundColor: 'var(--white-one)',
            borderRadius: '0 0.5rem 0.5rem 0',
            paddingLeft: '0.5rem',
            overflowY: 'scroll',
          }}
        >
          {users.map((user, idx) => (
            <UserCard
              key={idx}
              avatarUrl={user.avatarUrl}
              username={user.username}
            />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '10%',
          backgroundColor: 'var(--white-one)',
          borderRadius: '0 0 0.5rem 0.5rem',
          display: 'flex',
        }}
      >
        <textarea
          ref={textFieldMessageRef}
          style={{
            width: '100%',
            padding: '.25rem',
            outline: 'none',
            resize: 'none',
          }}
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <Button
          variant='contained'
          onClick={sendMessage}
          sx={{
            height: '100%',
            fontSize: '3rem',
            fontWeight: 'bold',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};
