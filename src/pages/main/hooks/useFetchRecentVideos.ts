import type {
  CropMethodType,
  MethodType,
  SubtitleStyleType,
} from "@apis/types/job";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

export interface MyVideoResponse {
  videos: {
    id: number;
    user: string;
    method: MethodType;
    subtitle: boolean;
    vertical: boolean;
    result_url: string;
    thumbnail_path: string;
    subtitle_style: SubtitleStyleType;
    crop_method: CropMethodType;
  }[];
  total: number;
}

export function useFetchRecentVideos({ limit }: { limit: number }) {
  return useQuery<MyVideoResponse, Error>({
    queryKey: ["recentvideos"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await axiosInstance.get(`${API.VIDEO.RECENT}?limit=${limit}`);
      return res.data;
    },
  });
}
