import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

interface CreditUseRequest {
  amount: number;
}

interface CreditUseResponse {
  message: string;
  total_credit: string;
}

export function useUseCredit() {
  const queryClient = useQueryClient();

  return useMutation<CreditUseResponse, Error, CreditUseRequest>({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(API.CREDIT.USE, data);
      return res.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success(`${variables.amount} was used from your account`);
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to use credits";
        toast.error(`❌ ${message}`);
      } else {
        toast.error("Unexpected error occured");
      }
    },
  });
}
