import { Avatar, Box, Typography } from '@mui/material';
import { memo } from 'react';

interface Props {
  avatarUrl: string;
  username: string;
  content: string;
}

export const Message = memo((props: Props): JSX.Element => {
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
      <Avatar src={props.avatarUrl} sx={{ width: 30, height: 30 }} />
      <Typography
        sx={{
          margin: '0 1rem 0 1rem',
          fontSize: '1.8rem',
        }}
      >
        {props.username}:
      </Typography>

      <Typography
        sx={{
          fontSize: '1.6rem',
        }}
      >
        {props.content}
      </Typography>
    </Box>
  );
});
