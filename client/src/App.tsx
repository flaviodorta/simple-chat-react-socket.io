import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { Layout } from './components/Layout/Layout.component';
import { JoinRoom } from './components/JoinRoom/JoinRoom.component';
import { Chat } from './components/Chat/Chat.component';
import { store } from './redux/global.store';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path='/join-room' element={<JoinRoom />} />
            <Route path='/room_:roomId' element={<Chat />} />
            <Route path='*' element={<Navigate to='/join-room' />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ReduxProvider>
  );
}
