import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout.component';
import { Lobby } from './pages/Lobby/Lobby.component';

export default function App() {
  return (
    <Layout>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Lobby />} />
        </Routes>
      </HashRouter>
    </Layout>
  );
}
