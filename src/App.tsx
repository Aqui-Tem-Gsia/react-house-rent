import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Toaster } from 'sonner';
import { AdminAdsPage } from './pages/admin/admin-ads-page';
import { AdminDashboardPage } from './pages/admin/admin-dashboard-page';
import { AdminHomePage } from './pages/admin/admin-home-page';
import AdminLoginPage from './pages/admin/admin-login-page';
import { PrivacyPolicyPage } from './pages/privacy-policy';
import { TermsPage } from './pages/terms-page';
import { ProtectedRoute } from './routes/protected-route';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<AdminHomePage />} />
          <Route path="ads" element={<AdminAdsPage />} />
        </Route>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      <Toaster position="top-right" richColors />
    </Router>
  );
}

export default App;
