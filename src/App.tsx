import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { IdeaBoxPage } from './pages/IdeaBoxPage';
import { SafeSpacePage } from './pages/SafeSpacePage';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<IdeaBoxPage />} />
          <Route path="/safe-space" element={<SafeSpacePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
