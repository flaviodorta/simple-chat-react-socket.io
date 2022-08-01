import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSocketIoContext } from '../../context/SocketIoContext.context';
import { useUserContext } from '../../context/UserContext.context';
import { JOIN_ROOM, USER_JOINED_ROOM } from '../../utils/constants';

export function ChatRoom(): JSX.Element {
  const { roomId } = useParams();
  const { socket } = useSocketIoContext();
  const { usernameRef } = useUserContext();

  socket?.on(USER_JOINED_ROOM, (msg) => {
    console.log(msg);
  });
  const username = usernameRef.current;

  useEffect(() => {
    console.log('cu');
    socket?.emit(JOIN_ROOM, { username, roomId });
  }, []);

  return (
    <Box
      sx={{
        width: '120rem',
        height: '80rem',
        backgroundColor: 'var(--white-one)',
        borderRadius: '1rem',
        boxShadow: 'var(--box-shadow)',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant='h6'>{roomId}</Typography>
    </Box>
  );
}
