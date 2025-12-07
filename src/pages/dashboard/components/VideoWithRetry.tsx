import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import styled from "styled-components";

export default function VideoWithRetry({
  file_path,
  retryInterval = 15000,
}: {
  file_path: string;
  retryInterval: number;
}) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: any;

    const loadVideo = async () => {
      try {
        const response = await fetch(file_path);

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setVideoUrl(url);
          setLoading(false);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.log("Video not ready yet...");
      }
    };

    loadVideo();
    intervalId = setInterval(loadVideo, retryInterval);

    return () => {
      clearInterval(intervalId);
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [file_path]);

  return (
    <ResultVideoContainer>
      {loading && (
        <LoadingState>
          <LoadingStateIcon>⏳</LoadingStateIcon>
          <LoadingStateText>Generating your short video...</LoadingStateText>
          <BeatLoader color="#8b5cf6" size={8} />
        </LoadingState>
      )}
      {videoUrl && (
        <Video
          src={videoUrl}
          controls
          style={{ display: loading ? "none" : "block" }}
        />
      )}
    </ResultVideoContainer>
  );
}

const ResultVideoContainer = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.4s ease;
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 60px 20px;
  height: 100%;
`;

const LoadingStateIcon = styled.div`
  font-size: 48px;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const LoadingStateText = styled.p`
  color: #cbd5e1;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  margin: 0;
`;
