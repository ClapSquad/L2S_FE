import type { JobData } from "@apis/types/job";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

export function useJobStatus({ id }: { id: string }) {
  return useQuery<JobData, Error>({
    queryKey: ["job", "status", id],
    queryFn: async () => {
      const res = await axiosInstance.get(API.RUNPOD.JOB.STATUS(id));
      return res.data;
    },
    refetchInterval: (query) => {
      if (!query.state.data) return false;
      const isProcessing =
        query.state.data.status === "pending" ||
        query.state.data.status === "processing";
      return isProcessing ? 10000 : false;
    },
  });
}
