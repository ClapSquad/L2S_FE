import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

interface DeleteJobParams {
  id: string;
}

interface DeleteJobResponse {
  message: string;
  job_id: boolean;
}

export function useDeleteJob() {
  return useMutation<DeleteJobResponse, Error, DeleteJobParams>({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await axiosInstance.delete(API.RUNPOD.JOB.DELETE(id), {
        timeout: 1000 * 10,
      });
      return res.data;
    },
    onSuccess: async (_data) => {
      toast.info("Your processed video has been deleted");
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.detail || "Failed to delete video";
        toast.error(`❌ ${message}`);
      } else {
        toast.error("Unexpected error occured");
      }
    },
  });
}
