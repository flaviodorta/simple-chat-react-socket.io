import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout.component';
import { JoinRoom } from './components/JoinRoom/JoinRoom.component';
import { SocketIoProvider } from './context/SocketIo.context';
import { Chat } from './components/Chat/Chat.component';
import { UserProvider } from './context/User.context';

export default function App() {
  return (
    <SocketIoProvider>
      <UserProvider>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path='/join-room' element={<JoinRoom />} />
              <Route path='/room_:roomId' element={<Chat />} />
              <Route path='*' element={<Navigate to='/join-room' />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </UserProvider>
    </SocketIoProvider>
  );
}
