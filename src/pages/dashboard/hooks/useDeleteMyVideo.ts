import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

export function useDeleteMyVideo() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(API.VIDEO.DELETE(id));
      return res.data;
    },
    onSuccess: (_data) => {
      toast.success("Video is successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["myvideo"],
      });
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to delete video";
        toast.error(`❌ ${message}`);
      } else {
        toast.error("Unexpected error occured");
      }
    },
  });
}
