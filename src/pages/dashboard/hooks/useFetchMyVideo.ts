import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

export interface MyVideoResponse {
  videos: {
    id: number;
    user_id: number;
    youtube_id: string | null;
    file_path: string;
  }[];
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
