import routePath from "@router/routePath";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";
import { AuthContext } from "src/contexts/AuthContext";
import queryClient from "src/apis/queryClient";
import type { UserInfoResponse } from "@apis/hooks/useMe";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
}

export function useLogin() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(API.AUTH.LOGIN, data);
      return res.data;
    },
    onSuccess: async (_data) => {
      toast.success("You're logged in");
      navigate(routePath.HOME);

      const me = await queryClient.fetchQuery<UserInfoResponse>({
        queryKey: ["me"],
        queryFn: async () => {
          const res = await axiosInstance.get(API.AUTH.ME);
          return res.data;
        },
      });
      setUser({
        email: me.user.email,
        username: me.user.username,
        credit: me.user.credit,
      });
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.detail || "Failed to login";
        toast.error(`❌ ${message}`);
      } else {
        toast.error("Unexpected error occured");
      }
    },
  });
}
