import type { VideoData } from "@apis/types/video";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

export interface MyVideoResponse {
  videos: VideoData[];
  total: number;
}

export function useFetchMyVideo() {
  return useQuery<MyVideoResponse, Error>({
    queryKey: ["myvideo"],
    queryFn: async () => {
      const res = await axiosInstance.get(API.VIDEO.MY);
      return res.data;
    },
  });
}
