import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export function Layout(props: Props): JSX.Element {
  const { children } = props;

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#89CFF0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}
