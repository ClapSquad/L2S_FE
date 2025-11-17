import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

interface YoutubeVideoUploadRequest {
  youtube_id: string;
}

interface YoutubeVideoUploadResponse {
  detail: string;
}

export function useVideoUploadYoutube() {
  return useMutation<
    YoutubeVideoUploadResponse,
    Error,
    YoutubeVideoUploadRequest
  >({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(API.VIDEO.UPLOAD.YOUTUBE, data, {
        timeout: 1000 * 60 * 5,
      });
      return res.data;
    },
    onSuccess: async (_data) => {
      toast.success("Youtube video uploaded");
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.detail || "Failed to upload youtube video";
        toast.error(`❌ ${message}`);
      } else {
        toast.error("Unexpected error occured");
      }
    },
  });
}
