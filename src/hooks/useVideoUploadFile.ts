import { axiosInstance } from "@apis/axiosInstance";
import { API } from "@apis/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

interface PresignResponse {
  presigned_url: string;
  video_uuid: string;
  filename: string;
}

interface UploadCompleteResponse {
  message: string;
  thumbnail_url: string;
  video_id: number;
  video_url: string;
}

export const useVideoUploadFile = () => {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);

  const mutation = useMutation<UploadCompleteResponse, Error, File>({
    mutationFn: async (file: File) => {
      setProgress(5);
      const { data: presignData } = await axiosInstance.get<PresignResponse>(
        API.VIDEO.UPLOAD.PRESIGN,
        {
          params: {
            filename: file.name,
            content_type: file.type,
          },
        }
      );

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round(5 + (event.loaded / event.total) * 85);
            setProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Upload failed: ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error("Upload failed"));

        xhr.open("PUT", presignData.presigned_url);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });

      setProgress(95);
      const { data: completeData } =
        await axiosInstance.post<UploadCompleteResponse>(
          API.VIDEO.UPLOAD.DONE,
          {
            video_uuid: presignData.video_uuid,
            original_filename: file.name,
            filename: presignData.filename,
          }
        );

      setProgress(100);
      return completeData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Video successfully uploaded.");
    },
    onError: (error) => {
      toast.error(error.message || "Upload failed");
    },
    onSettled: () => {
      setTimeout(() => setProgress(0), 500);
    },
  });

  return {
    progress,
    ...mutation,
  };
};
