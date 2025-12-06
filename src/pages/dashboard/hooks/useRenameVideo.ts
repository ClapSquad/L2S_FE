import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

interface RenameRequest {
  video_id: string;
  name: string;
}

interface RenameResponse {
  message: string;
}

export function useRenameVideo() {
  const queryClient = useQueryClient();
  return useMutation<RenameResponse, Error, RenameRequest>({
    mutationFn: async (data) => {
      const res = await axiosInstance.patch(API.VIDEO.RENAME, data);
      return res.data;
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["myvideo"] });
      toast.success(data.message);
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.detail || "Failed to update name";
        toast.error(`❌ ${message}`);
      } else {
        toast.error("Unexpected error occured");
      }
    },
  });
}
