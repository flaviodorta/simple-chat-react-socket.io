import { AxiosResponse } from 'axios';

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocketIoContext } from '../../context/SocketIo.context';
import { useFetchAxios } from '../../hooks/useFetchAxios';
import { useDispatch, useSelector } from 'react-redux';
import {
  chatActions,
  RootState,
  userActions,
  useThunkDispatch,
} from '../../redux/global.store';

import { URL_AVATAR_API } from '../../utils/constants';

import { Box, Button, TextField, Typography } from '@mui/material';
// import { useOnKeyPress } from '../../hooks/useOnKeyPress';
import { resetState } from '../../redux/actions/global.action';
import { nanoid } from '@reduxjs/toolkit';

export const JoinRoom = (): JSX.Element => {
  const { socket } = useSocketIoContext();

  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [usernameInputError, setUsernameInputError] = useState(false);
  const [roomIdInputError, setRoomIdInputError] = useState(false);

  const [avatarUrlResponse] = useFetchAxios(URL_AVATAR_API(username));

  const removeErrorFromInput = () => {
    setUsernameInputError(false);
    setRoomIdInputError(false);
  };

  const joinRoom = useCallback(() => {
    if (!username) {
      setUsernameInputError(true);
    }
    if (!roomId) {
      setRoomIdInputError(true);
    }
    if (username && roomId) {
      setUsernameInputError(false);
      setRoomIdInputError(false);

      dispatch(userActions.setUserId(nanoid()));
      dispatch(userActions.setUsername(username));
      dispatch(userActions.setRoomId(roomId));

      if (avatarUrlResponse) {
        dispatch(
          userActions.setAvatarUrl(
            (avatarUrlResponse as AxiosResponse)?.config.url as string
          )
        );
      } else {
        dispatch(userActions.setAvatarUrl(URL_AVATAR_API(nanoid())));
      }

      socket?.emit('user join room', { roomId });

      socket?.on('send all users', ({ allUsers }) => {
        dispatch(chatActions.setUsers(allUsers));
      });

      socket?.on('send all messages', ({ allMessages }) => {
        console.log(allMessages);
        dispatch(chatActions.setMessages(allMessages));
      });

      navigate(`/room_${roomId}`, { replace: true });
    }
  }, [avatarUrlResponse, dispatch, navigate, roomId, username, socket]);

  const joinRoomOnEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        joinRoom();
      }
    },
    [joinRoom]
  );

  useEffect(() => {
    window.addEventListener('keypress', joinRoomOnEnter);

    return () => {
      window.removeEventListener('keypress', joinRoomOnEnter);
    };
  });

  useEffect(() => {
    thunkDispatch(resetState());
  });

  // useOnKeyPress('Enter', joinRoom);

  return (
    <Box
      sx={{
        height: '23rem',
        width: '33rem',
        padding: '2rem',
        backgroundColor: 'var(--white-one)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '8px',
        transform: 'translateY(-30%)',
        boxShadow: 'var(--box-shadow)',
      }}
      data-testid='join-room-box'
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='h4'
          component='h6'
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            letterSpacing: '1.4px',
          }}
        >
          Join a Room
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          width: '85%',
          marginTop: '-2rem',
        }}
      >
        <TextField
          id='standard-basic'
          variant='standard'
          label='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={removeErrorFromInput}
          onKeyDown={(e) => (e.key === 'enter' ? joinRoom : null)}
          size='medium'
          error={usernameInputError}
          sx={{
            width: '100%',
            fontSize: '1.5rem',
          }}
        />
        <TextField
          id='standard-basic'
          variant='standard'
          label='Room ID'
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          onFocus={removeErrorFromInput}
          onKeyDown={(e) => (e.key === '13' ? joinRoom : null)}
          error={roomIdInputError}
          sx={{
            width: '100%',
            fontSize: '1.5rem',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant='contained'
          onClick={joinRoom}
          sx={{
            fontSize: '1.6rem',
            fontWeight: 'bold',
          }}
        >
          Join
        </Button>
      </Box>
    </Box>
  );
};
