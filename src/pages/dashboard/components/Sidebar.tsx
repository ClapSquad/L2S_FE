import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { dashboardSubPath } from "@router/routePath";
import { useFetchMyVideo } from "../hooks/useFetchMyVideo";
import { useDeleteMyVideo } from "../hooks/useDeleteMyVideo";
import { MovieEditIcon } from "src/icons/MovieEditIcon";
import { YoutubeActivityIcon } from "src/icons/YoutubeActivityIcon";

export default function Sidebar() {
  const { data } = useFetchMyVideo();
  const navigate = useNavigate();
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mutate } = useDeleteMyVideo();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteVideo = async (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("이 비디오를 삭제하시겠습니까?")) {
      mutate(`${videoId}`);
      setOpenDropdownId(null);
    }
  };

  const toggleDropdown = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === videoId ? null : videoId);
  };

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
            <VideoHeader onMouseLeave={() => setOpenDropdownId(null)}>
              {video.youtube_id ? (
                <YoutubeActivityIcon size="24px" color="white" />
              ) : (
                <MovieEditIcon size="24px" color="white" />
              )}
              <VideoTitle>{`Video ${video.id}`}</VideoTitle>

              <DropdownWrapper
                ref={openDropdownId === video.id ? dropdownRef : null}
              >
                <MenuButton onClick={(e) => toggleDropdown(video.id, e)}>
                  ⋮
                </MenuButton>

                {openDropdownId === video.id && (
                  <DropdownMenu>
                    <DropdownItem
                      onClick={(e) => handleDeleteVideo(video.id, e)}
                    >
                      🗑️ Delete
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </DropdownWrapper>
            </VideoHeader>

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

const ThumbnailCard = styled.div`
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
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:hover ${ThumbnailImageWrapper} {
    max-height: 140px;
    opacity: 1;
    transform: translateY(0);
  }
`;

const VideoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  gap: 8px;
`;

const VideoTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #e5e7eb;
  flex: 1;
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #e5e7eb;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: #1f2937;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  min-width: 140px;
  overflow: hidden;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 10px 16px;
  background: none;
  border: none;
  color: #e5e7eb;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
`;
