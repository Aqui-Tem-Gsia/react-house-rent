import { Suspense, lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import { AdminAdsPage } from "./pages/admin/admin-ads-page";
import { AdminCreateAdPage } from "./pages/admin/admin-create-ad-page";
import { AdminDashboardPage } from "./pages/admin/admin-dashboard-page";
import AdminLoginPage from "./pages/admin/admin-login-page";
import { AdminRefundsPage } from "./pages/admin/admin-refunds-page";
import { ListingPage } from "./pages/listing";
import { PrivacyPolicyPage } from "./pages/privacy-policy";
import { ResetPasswordPage } from "./pages/reset-password";
import { TermsPage } from "./pages/terms-page";
import { ProtectedRoute } from "./routes/protected-route";
import SupportPage from "./pages/support-page";
import { Skeleton } from "./components/ui/skeleton";

// O dashboard arrasta a biblioteca de gráficos (~500 kB). Como o bundle é
// único, sem o lazy esse peso cairia também em /listing/:id, /terms e nas
// outras páginas públicas, que nunca desenham um gráfico.
const AdminHomePage = lazy(() =>
  import("./pages/admin/admin-home-page").then((module) => ({
    default: module.AdminHomePage,
  })),
);

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
        element: (
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            }
          >
            <AdminHomePage />
          </Suspense>
        ),
      },
      {
        path: "ads",
        element: <AdminAdsPage />,
      },
      {
        path: "ads/create",
        element: <AdminCreateAdPage />,
      },
      {
        path: "refunds",
        element: <AdminRefundsPage />,
      },
    ],
  },
]);
