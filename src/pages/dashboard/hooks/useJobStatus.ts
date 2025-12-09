import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/apis/axiosInstance";
import { API } from "src/apis/endpoints";

type JobStatusData = {
  video_id: string;
  status: string;
  method: string;
  subtitle: boolean;
  vertical: boolean;
  result_url: string;
  error_message: string;
  created_at: string;
  started_at: string;
  completed_at: string;
  name: string;
  public: boolean;
};

export function useJobStatus({ id }: { id: string }) {
  return useQuery<JobStatusData, Error>({
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
