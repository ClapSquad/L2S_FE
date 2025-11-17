import { Route, Routes } from "react-router-dom";
import MainPage from "@main/MainPage";
import LoginPage from "@auth/LoginPage";
import RegisterPage from "@auth/RegisterPage";
import MyPage from "@my/MyPage";
import routePath from "./routePath";
import ErrorPage from "src/pages/error/ErrorPage";
import DashboardPage from "src/pages/dashboard/DashboardPage";

export default function Router() {
  return (
    <Routes>
      <Route path={routePath.HOME} element={<MainPage />} />
      <Route path={routePath.LOGIN} element={<LoginPage />} />
      <Route path={routePath.REGISTER} element={<RegisterPage />} />
      <Route path={routePath.MY} element={<MyPage />} />
      <Route path={routePath.DASHBOARD} element={<DashboardPage />} />
      <Route path={routePath.ERROR} element={<ErrorPage />} />
    </Routes>
  );
}
