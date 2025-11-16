import routePath from "@router/routePath";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

export function useWithdraw() {
  const navigate = useNavigate();

  return useMutation<Error>({
    mutationFn: async () => {
      const res = await axiosInstance.delete(API.AUTH.WITHDRAW);
      return res.data;
    },
    onSuccess: (_data) => {
      toast.success("Account is successfully deleted");
      navigate(routePath.HOME);
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to delete account";
        toast.error(`❌ ${message}`);
      } else {
        toast.error("Unexpected error occured");
      }
    },
  });
}
