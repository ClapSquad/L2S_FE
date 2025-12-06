import { Route, Routes, useNavigate } from "react-router-dom";
import MainPage from "@main/MainPage";
import LoginPage from "@auth/LoginPage";
import RegisterPage from "@auth/RegisterPage";
import MyPage from "@my/MyPage";
import routePath, { dashboardSubPath } from "./routePath";
import ErrorPage from "src/pages/error/ErrorPage";
import DashboardPage from "src/pages/dashboard/DashboardPage";
import CreditPage from "src/pages/credit/CreditPage";
import ProtectedRoute from "./ProtectedRoute";
import UploadPage from "src/pages/dashboard/subpages/UploadPage";
import VideoPage from "src/pages/dashboard/subpages/VideoPage";
import { setNavigate } from "./navigation";

function GlobalNavigateSetter() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return null;
}

export default function Router() {
  return (
    <>
      <GlobalNavigateSetter />
      <Routes>
        <Route path={routePath.HOME} element={<MainPage />} />
        <Route path={routePath.LOGIN} element={<LoginPage />} />
        <Route path={routePath.REGISTER} element={<RegisterPage />} />
        <Route
          path={routePath.MY}
          element={<ProtectedRoute element={<MyPage />} />}
        />
        <Route
          path={routePath.DASHBOARD}
          element={<ProtectedRoute element={<DashboardPage />} />}
        >
          <Route index element={<UploadPage />} />

          <Route path={dashboardSubPath.UPLOAD} element={<UploadPage />} />
          <Route path={dashboardSubPath.VIDEO} element={<VideoPage />} />
        </Route>
        <Route
          path={routePath.CREDIT}
          element={<ProtectedRoute element={<CreditPage />} />}
        />
        <Route path={routePath.ERROR} element={<ErrorPage />} />
      </Routes>
    </>
  );
}
