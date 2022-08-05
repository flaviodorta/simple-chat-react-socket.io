import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSocketIoContext } from '../../context/SocketIo.context';
import { useUserContext } from '../../context/User.context';
import { useFetchAxios } from '../../hooks/useFetchAxios';

import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { JOIN_ROOM, USER_JOINED_ROOM } from '../../utils/constants';

export function Chat(): JSX.Element {
  const { room_id } = useParams();
  const { socket } = useSocketIoContext();
  const { username, roomId, avatarUrl } = useUserContext();
  const x = useRef(1);

  socket?.on(USER_JOINED_ROOM, (msg) => {
    console.log(msg);
  });

  useEffect(() => {
    socket?.emit(JOIN_ROOM, { username, roomId });
  }, []);

  useEffect(() => {
    console.log(avatarUrl);
    console.log(username);
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
          height: '85%',
          borderRadius: '0.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '79.5%',
            height: '100%',
            backgroundColor: 'var(--white-one)',
            borderRadius: '0.5rem 0 0 0.5rem',
            padding: '2rem 1rem 2rem 1rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: '2rem',
              width: '100%',
            }}
          >
            <Avatar src={avatarUrl} sx={{ width: 45, height: 45 }} />
            <Typography
              sx={{
                margin: '0 1rem 0 1rem',
                fontSize: '1.6rem',
              }}
            >
              {username}:
            </Typography>

            <Typography
              sx={{
                fontSize: '1.6rem',
              }}
            >
              Cuzinho
            </Typography>
          </Box>
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
          fullWidth
          multiline={true}
          rows={4}
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
}
