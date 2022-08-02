import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocketIoContext } from '../../context/SocketIoContext.context';

import { JOIN_ROOM } from '../../utils/constants';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useUserContext } from '../../context/UserContext.context';

export function JoinRoom(): JSX.Element {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [usernameInputError, setUsernameInputError] = useState(false);
  const [roomIdInputError, setRoomIdInputError] = useState(false);

  const { socket } = useSocketIoContext();
  const { socketIdRef, roomIdRef, usernameRef } = useUserContext();

  const navigate = useNavigate();

  const joinRoom = () => {
    if (!username) {
      setUsernameInputError(true);
    }
    if (!roomId) {
      setRoomIdInputError(true);
    }
    if (username && roomId) {
      setUsernameInputError(false);
      setRoomIdInputError(false);

      socketIdRef.current = socket?.id;
      usernameRef.current = username;
      roomIdRef.current = roomId;

      // fetch avatar

      navigate(`/room_${roomId}`, { replace: true });
    }
  };

  const removeErrorFromInput = () => {
    setUsernameInputError(false);
    setRoomIdInputError(false);
  };

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
}
