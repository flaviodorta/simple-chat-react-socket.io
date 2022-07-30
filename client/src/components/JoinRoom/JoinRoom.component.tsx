import { Box } from '@mui/material';

export function JoinRoom(): JSX.Element {
  return (
    <Box
      sx={{
        height: '23rem',
        width: '33rem',
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        borderRadius: '8px',
        transform: 'translateY(-30%)',
        boxShadow: 'var(--boxShadow)',
      }}
      data-testid='join-room-box'
    ></Box>
  );
}
