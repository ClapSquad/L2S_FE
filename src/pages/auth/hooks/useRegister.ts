import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";
import { useLogin } from "./useLogin";

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  user: string;
}

export function useRegister() {
  const { mutate: mutateLogin } = useLogin();

  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(API.AUTH.REGISTER, data);
      return res.data;
    },
    onSuccess: (_data, variables) => {
      toast.success("Account created");
      mutateLogin({ email: variables.email, password: variables.password });
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to create account";
        toast.error(`❌ ${message}`);
      } else {
        toast.error("Unexpected error occured");
      }
    },
  });
}
