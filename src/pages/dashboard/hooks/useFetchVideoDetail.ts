import type { VideoData } from "@apis/types/video";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

export function useFetchVideoDetail({ id }: { id: string }) {
  return useQuery<VideoData, Error>({
    queryKey: ["video", "detail", id],
    queryFn: async () => {
      const res = await axiosInstance.get(API.VIDEO.DETAIL(id));
      return res.data;
    },
  });
}
