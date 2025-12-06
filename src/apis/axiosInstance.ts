import { showCreditConfirmToast } from "@components/ConfirmToast";
import { globalNavigate } from "@router/navigation";
import routePath from "@router/routePath";
import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === "ERR_NETWORK" && error.request.status === 0) {
      globalNavigate(routePath.ERROR);
    }

    if (error.response?.status === 402) {
      showCreditConfirmToast({
        message: "Insufficient credits, Get more?",
        onYes: () => {
          globalNavigate(routePath.CREDIT);
        },
      });
    }

    return Promise.reject(error);
  }
);

export const handleApiError = (error: any): never => {
  if (error instanceof AxiosError) {
    throw new Error(
      `API 에러: ${error.response?.data.message || error.message}`
    );
  }
  throw error;
};
