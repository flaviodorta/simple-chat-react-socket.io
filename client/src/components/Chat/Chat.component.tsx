import { Box, Button, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions, RootState } from '../../redux/global.store';
import { Message } from './Message.component';

export const Chat = (): JSX.Element => {
  const dispatch = useDispatch();
  const {
    chat: { messages, users },
    user: { username, roomId, avatarUrl },
  } = useSelector((state: RootState) => state);

  const [messageContent, setMessageContent] = useState<string>('');

  const textFieldMessageRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    console.log(username);
    dispatch(
      chatActions.setMessages([
        ...messages,
        { avatarUrl, username, content: messageContent },
      ])
    );

    // textFieldMessageRef?.current.value = 'cu';
  };

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
          height: '85%',
          borderRadius: '0.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '79.5%',
            height: '100%',
            backgroundColor: 'var(--white-one)',
            borderRadius: '0.5rem 0 0 0.5rem',
            padding: '2rem 1rem 2rem 1rem',
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
            justifyContent: 'space-between',
            width: '20%',
            height: '100%',
            backgroundColor: 'var(--white-one)',
            borderRadius: '0 0.5rem 0.5rem 0',
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '14.25%',
          backgroundColor: 'var(--white-one)',
          borderRadius: '0 0 0.5rem 0.5rem',
          display: 'flex',
        }}
      >
        <TextField
          ref={textFieldMessageRef}
          fullWidth
          multiline={true}
          rows={4}
          onChange={(e) => setMessageContent(e.target.value)}
          InputProps={{
            sx: {
              fontSize: '2rem',
              height: '100%',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              '&:hover': {
                border: 'none',
              },
            },
          }}
          sx={{
            height: '100%',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            '&:hover': {
              border: 'none',
            },
          }}
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
