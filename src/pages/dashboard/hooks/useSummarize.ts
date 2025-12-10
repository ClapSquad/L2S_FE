import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";
import type { SubtitleStyle } from "@components/SubtitleStyleSelector";

interface SummarizeRequest {
  video_id: string;
  method: "llm_only" | "echofusion";
  subtitle: boolean;
  subtitle_style?: SubtitleStyle | null;
  vertical: boolean;
}

interface SummarizeResponse {
  job_id: string;
  runpod_job_id: string;
  status: string;
  message: string;
}

export function useSummarize() {
  const queryClient = useQueryClient();
  return useMutation<SummarizeResponse, Error, SummarizeRequest>({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(API.RUNPOD.SUMMARIZE, data, {
        timeout: 1000 * 10,
      });
      return res.data;
    },
    onSuccess: async (_data) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
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
