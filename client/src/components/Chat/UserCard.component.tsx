import { Avatar, Box, Typography } from '@mui/material';
import { memo } from 'react';

interface Props {
  avatarUrl: string;
  username: string;
}

export const UserCard = memo((props: Props): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '2rem',
        width: '100%',
        margin: '0.75rem 0 0.75rem 0',
      }}
    >
      <Avatar src={props.avatarUrl} sx={{ width: 20, height: 20 }} />
      <Typography
        sx={{
          margin: '0 1rem 0 1rem',
          fontSize: '1.4rem',
        }}
      >
        {props.username}
      </Typography>
    </Box>
  );
});
