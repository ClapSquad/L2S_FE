import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

interface ProcessRequest {
  command: string;
  data: {
    input: {
      job_id: string;
      task: "process_video" | "generate_thumbnail";
      video_url: string;
      options: {
        method: "llm_only" | "echofusion";
        language: string;
      };
    };
  };
}

interface ProcessResponse {
  id: string;
  status: string;
  error?: string;
}

export function useProcess() {
  return useMutation<ProcessResponse, Error, ProcessRequest>({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(API.RUNPOD.PROCESS, data, {
        timeout: 1000 * 60,
      });
      return res.data;
    },
    onSuccess: async (_data) => {
      toast.info("Your video is being processed");
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.detail || "Failed to generate video";
        toast.error(`❌ ${message}`);
      } else {
        toast.error("Unexpected error occured");
      }
    },
  });
}
