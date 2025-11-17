import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

export interface VideoDetailResponse {
  id: number;
  user_id: number;
  youtube_id: string | null;
  file_path: string;
}

export function useFetchVideoDetail({ id }: { id: string }) {
  return useQuery<VideoDetailResponse, Error>({
    queryKey: ["video", "detail", id],
    queryFn: async () => {
      const res = await axiosInstance.get(API.VIDEO.DETAIL(id));
      return res.data;
    },
  });
}
