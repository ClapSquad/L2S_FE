import { Route, Routes } from "react-router-dom";
import MainPage from "@main/MainPage";
import LoginPage from "@auth/LoginPage";
import RegisterPage from "@auth/RegisterPage";
import MyPage from "@my/MyPage";
import routePath from "./routePath";
import ErrorPage from "src/pages/error/ErrorPage";
import DashboardPage from "src/pages/dashboard/DashboardPage";
import CreditPage from "src/pages/credit/CreditPage";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
  return (
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
      />
      <Route
        path={routePath.CREDIT}
        element={<ProtectedRoute element={<CreditPage />} />}
      />
      <Route path={routePath.ERROR} element={<ErrorPage />} />
    </Routes>
  );
}
