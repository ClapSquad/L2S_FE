export type MethodType = "echofusion" | "llm_only";
export type SubtitleStyleType = "dynamic" | "casual" | null;
export type CropMethodType = "center" | "blur" | null;

export type JobData = {
  video_id: number;
  status: string;
  method: MethodType;
  subtitle: boolean;
  vertical: boolean;
  result_url: string;
  error_message: string | null;
  created_at: string;
  started_at: string;
  completed_at: string;
  public: boolean;
  subtitle_style: SubtitleStyleType;
  crop_method: CropMethodType;
};

export type SimpleJobData = {
  job_id: string;
  video_id: string;
  method: MethodType;
  subtitle: boolean;
  vertical: boolean;
  status: string;
  name: string;
  subtitle_style: SubtitleStyleType;
  crop_method: CropMethodType;
};
