import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";
import { AuthContext } from "src/contexts/AuthContext";

export function useLogout() {
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post(API.AUTH.LOGOUT);
      return res.data;
    },
    onSuccess: async (_data) => {
      toast.success("You're logged out");
      setUser(null);
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.detail || "Failed to logout";
        toast.error(`❌ ${message}`);
      } else {
        toast.error("Unexpected error occured");
      }
    },
  });
}
