import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

interface ChangePublicityOfJobRequest {
  job_id: string;
  public: boolean;
}

interface ChangePublicityOfJobResponse {
  message: string;
}

export function useChangePublicityOfJob() {
  const queryClient = useQueryClient();
  return useMutation<
    ChangePublicityOfJobResponse,
    Error,
    ChangePublicityOfJobRequest
  >({
    mutationFn: async (data) => {
      const res = await axiosInstance.patch(API.RUNPOD.JOB.PUBLIC, data);
      return res.data;
    },
    onSuccess: async (data, req) => {
      queryClient.invalidateQueries({
        queryKey: ["job", "status", req.job_id],
      });
      toast.success(data.message);
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.detail || "Failed to update publicity";
        toast.error(`❌ ${message}`);
      } else {
        toast.error("Unexpected error occured");
      }
    },
  });
}
