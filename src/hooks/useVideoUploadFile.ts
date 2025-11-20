import { axiosInstance } from "@apis/axiosInstance";
import { API } from "@apis/endpoints";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

interface VideoFileUploadResponse {
  data: {
    message: string;
    thumbnail_url: string;
    video_id: number;
    video_url: string;
  };
}

export const useVideoUploadFile = () => {
  const [progress, setProgress] = useState(0);

  const mutation = useMutation<VideoFileUploadResponse, Error, any>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      return axiosInstance.post(API.VIDEO.UPLOAD.FILE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        timeout: 1000 * 60 * 30,

        onUploadProgress: (event) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          }
        },
      });
    },
    onSuccess: () => {
      toast.success("Video successfully uploaded.");
    },
    onSettled: () => {
      setProgress(0);
    },
  });

  return {
    progress,
    ...mutation,
  };
};
