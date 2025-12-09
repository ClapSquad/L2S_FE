import type { SimpleJobData } from "@apis/types/job";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

export function useMyJob({ video_id }: { video_id: string }) {
  return useQuery<SimpleJobData[], Error>({
    queryKey: ["job", "my", video_id],
    queryFn: async () => {
      const res = await axiosInstance.get(API.RUNPOD.JOB.MY);
      const filtered = res.data.jobs.filter(
        (job: SimpleJobData) => job.video_id == video_id
      );
      return filtered;
    },
    refetchInterval: (query) => {
      if (!query.state.data) return false;
      const hasProcessingJob = query.state.data.some(
        (job) => job.status === "pending" || job.status === "processing"
      );
      return hasProcessingJob ? 10000 : false;
    },
  });
}
