import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

interface CreditAddRequest {
  amount: number;
}

interface CreditAddResponse {
  message: string;
  total_credit: string;
}

export function useAddCredit() {
  const queryClient = useQueryClient();

  return useMutation<CreditAddResponse, Error, CreditAddRequest>({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(API.CREDIT.ADD, data);
      return res.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success(`${variables.amount} was added to your account`);
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Failed add credits";
        toast.error(`❌ ${message}`);
      } else {
        toast.error("Unexpected error occured");
      }
    },
  });
}
