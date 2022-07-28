import { useState } from 'react';
import { useSocketIo } from './hooks/useSocketIo';
import styled from 'styled-components';

import { GlobalStyle } from './styles/global-style/global-style';
import { AppThemeProvider } from './context/theme/ThemeAppContext';

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  const socket = useSocketIo();
  const [inputValue, setInputValue] = useState('');

  socket?.on('chat message', (msg) => {
    console.log(msg);
  });
  const emitMessage = () => {
    console.log(inputValue);
    if (inputValue) {
      socket?.emit('chat message', inputValue);
    }
  };

  return (
    <AppThemeProvider>
      <Layout>
        <input type='text' onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={emitMessage}>Click</button>
      </Layout>
      <GlobalStyle />
    </AppThemeProvider>
  );
}
