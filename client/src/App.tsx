import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout.component';
import { Lobby } from './pages/Lobby/Lobby.component';

export default function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path='/lobby' element={<Lobby />} />
          <Route path='*' element={<Navigate to='/lobby' />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}
