import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './redux/global.store';

import { Layout } from './components/Layout/Layout.component';
import { JoinRoom } from './components/JoinRoom/JoinRoom.component';
import { Chat } from './components/Chat/Chat.component';
import { SocketIoProvider } from './context/SocketIo.context';

export default function App() {
  return (
    <SocketIoProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <BrowserRouter>
              <Routes>
                <Route path='/join-room' element={<JoinRoom />} />
                <Route path='/room_:roomId' element={<Chat />} />
                <Route path='*' element={<Navigate to='/join-room' />} />
              </Routes>
            </BrowserRouter>
          </Layout>
        </PersistGate>
      </ReduxProvider>
    </SocketIoProvider>
  );
}
