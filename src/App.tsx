import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLoginPage from "./pages/admin/admin-login-page";
import { AdminDashboardPage } from "./pages/admin/admin-dashboard-page";
import { AdminHomePage } from "./pages/admin/admin-home-page";
import { ProtectedRoute } from "./routes/protected-route";
import { AdminAdsPage } from "./pages/admin/admin-ads-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />

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
    </Router>
  );
}

export default App;
