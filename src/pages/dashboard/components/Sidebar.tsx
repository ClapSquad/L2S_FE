import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { dashboardSubPath } from "@router/routePath";
import { useFetchMyVideo } from "../hooks/useFetchMyVideo";

export default function Sidebar() {
  const { data } = useFetchMyVideo();
  const navigate = useNavigate();

  return (
    <SidebarWrapper>
      <UploadButton onClick={() => navigate(dashboardSubPath.UPLOAD)}>
        + Upload Video
      </UploadButton>

      {data?.videos.map((video) => {
        return (
          <ThumbnailCard
            key={video.id}
            onClick={() => navigate(dashboardSubPath.R_VIDEO(video.id))}
          >
            <VideoTitle>{`Video ${video.id}`}</VideoTitle>

            <ThumbnailImageWrapper>
              <ThumbnailImage src={video.thumbnail_path} alt="thumbnail" />
            </ThumbnailImageWrapper>
          </ThumbnailCard>
        );
      })}
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.div`
  width: 240px;
  background: #111827;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100vh - 110px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    margin: 8px 0;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    border-radius: 10px;
  }
`;

const UploadButton = styled.button`
  padding: 14px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  color: white;
  font-weight: 600;
  transition: 0.25s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const ThumbnailImageWrapper = styled.div`
  width: 100%;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-10px);
  transition: max-height 0.35s ease, opacity 0.35s ease, transform 0.35s ease;
`;

const ThumbnailCard = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
  padding: 0;
  background: rgba(255, 255, 255, 0.05);
  transition: 0.25s;
  display: flex;
  flex-direction: column;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:hover ${ThumbnailImageWrapper} {
    max-height: 140px;
    opacity: 1;
    transform: translateY(0);
  }
`;

const VideoTitle = styled.div`
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #e5e7eb;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
`;
