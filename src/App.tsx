import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { IdeaBoxPage } from './pages/IdeaBoxPage';
import { SafeSpacePage } from './pages/SafeSpacePage';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LandingPage />} />

        <Route path="/*" element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<IdeaBoxPage />} />
                <Route path="/safe-space" element={<SafeSpacePage />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute requireAdmin>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
