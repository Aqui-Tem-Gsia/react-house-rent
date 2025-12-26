import { createBrowserRouter, redirect } from "react-router-dom";
import { AdminAdsPage } from "./pages/admin/admin-ads-page";
import { AdminDashboardPage } from "./pages/admin/admin-dashboard-page";
import { AdminHomePage } from "./pages/admin/admin-home-page";
import AdminLoginPage from "./pages/admin/admin-login-page";
import { AdminRefundsPage } from "./pages/admin/admin-refunds-page";
import { ListingPage } from "./pages/listing";
import { PrivacyPolicyPage } from "./pages/privacy-policy";
import { ResetPasswordPage } from "./pages/reset-password";
import { TermsPage } from "./pages/terms-page";
import { ProtectedRoute } from "./routes/protected-route";
import SupportPage from "./pages/support-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
    loader: () => {
      return redirect("/admin/login");
    },
  },
  {
    path: "/terms",
    element: <TermsPage />,
  },
  {
    path: "/support",
    element: <SupportPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/listing/:listingId",
    element: <ListingPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboardPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: <AdminHomePage />,
      },
      {
        path: "ads",
        element: <AdminAdsPage />,
      },
      {
        path: "refunds",
        element: <AdminRefundsPage />,
      },
    ],
  },
]);
