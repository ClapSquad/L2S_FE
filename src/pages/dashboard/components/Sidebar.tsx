import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { dashboardSubPath } from "@router/routePath";
import { useFetchMyVideo } from "../hooks/useFetchMyVideo";
import { useDeleteMyVideo } from "../hooks/useDeleteMyVideo";
import { MovieEditIcon } from "src/icons/MovieEditIcon";
import { YoutubeActivityIcon } from "src/icons/YoutubeActivityIcon";
import { useRenameVideo } from "../hooks/useRenameVideo";

export default function Sidebar() {
  const { data } = useFetchMyVideo();
  const navigate = useNavigate();
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string>("");
  const [failedThumbnails, setFailedThumbnails] = useState<Set<number>>(
    new Set()
  );
  const [imageTimestamps, setImageTimestamps] = useState<Map<number, number>>(
    new Map()
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useDeleteMyVideo();
  const { mutate: mutateName } = useRenameVideo();

  useEffect(() => {
    if (failedThumbnails.size === 0) return;

    const interval = setInterval(() => {
      setImageTimestamps((prev) => {
        const newMap = new Map(prev);
        failedThumbnails.forEach((videoId) => {
          newMap.set(videoId, Date.now()); // timestamp 변경
        });
        return newMap;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [failedThumbnails]);

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

  useEffect(() => {
    if (editingId !== null && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  const handleDeleteVideo = async (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("이 비디오를 삭제하시겠습니까?")) {
      mutate(`${videoId}`, {
        onSuccess: () => {
          navigate(dashboardSubPath.UPLOAD);
        },
      });
      setOpenDropdownId(null);
    }
  };

  const handleEditClick = (
    videoId: number,
    currentName: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setEditingId(videoId);
    setEditingName(currentName ?? `Video ${videoId}`);
    setOpenDropdownId(null);
  };

  const handleRenameSubmit = (videoId: number) => {
    if (
      editingName.trim() &&
      editingName !== data?.videos.find((v) => v.id === videoId)?.name
    ) {
      mutateName(
        { video_id: `${videoId}`, name: editingName.trim() },
        {
          onSuccess: () => {
            setEditingId(null);
            setEditingName("");
          },
        }
      );
    } else {
      setEditingId(null);
      setEditingName("");
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    videoId: number
  ) => {
    if (e.key === "Enter") {
      handleRenameSubmit(videoId);
    } else if (e.key === "Escape") {
      setEditingId(null);
      setEditingName("");
    }
  };

  const toggleDropdown = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === videoId ? null : videoId);
  };

  const handleThumbnailError = (videoId: number) => {
    setFailedThumbnails((prev) => {
      const newSet = new Set(prev);
      newSet.add(videoId);
      return newSet;
    });
  };

  const handleThumbnailLoad = (videoId: number) => {
    setFailedThumbnails((prev) => {
      const newSet = new Set(prev);
      newSet.delete(videoId);
      return newSet;
    });
  };

  return (
    <SidebarWrapper>
      <UploadButton onClick={() => navigate(dashboardSubPath.UPLOAD)}>
        + Upload Video
      </UploadButton>

      {data?.videos
        .slice()
        .sort((a, b) => a.id - b.id)
        .map((video) => {
          const isEditing = editingId === video.id;

          return (
            <ThumbnailCard
              key={video.id}
              $open={failedThumbnails.has(video.id)}
              onClick={() =>
                !isEditing && navigate(dashboardSubPath.R_VIDEO(video.id))
              }
            >
              <VideoHeader onMouseLeave={() => setOpenDropdownId(null)}>
                {video.youtube_id ? (
                  <YoutubeActivityIcon size="24px" color="white" />
                ) : (
                  <MovieEditIcon size="24px" color="white" />
                )}

                {isEditing ? (
                  <EditInput
                    ref={inputRef}
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={() => handleRenameSubmit(video.id)}
                    onKeyDown={(e) => handleKeyDown(e, video.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <VideoTitle>{video.name ?? `Video ${video.id}`}</VideoTitle>
                )}

                <DropdownWrapper
                  ref={openDropdownId === video.id ? dropdownRef : null}
                >
                  <MenuButton onClick={(e) => toggleDropdown(video.id, e)}>
                    ⋮
                  </MenuButton>

                  {openDropdownId === video.id && (
                    <DropdownMenu>
                      <DropdownItem
                        onClick={(e) =>
                          handleEditClick(
                            video.id,
                            video.name ?? `Video ${video.id}`,
                            e
                          )
                        }
                      >
                        ✏️ Edit
                      </DropdownItem>
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
                <ThumbnailImage
                  key={imageTimestamps.get(video.id) ?? "init"}
                  src={`${video.thumbnail_path}?t=${
                    imageTimestamps.get(video.id) ?? 0
                  }`}
                  onError={() => handleThumbnailError(video.id)}
                  onLoad={() => handleThumbnailLoad(video.id)}
                  style={{ opacity: failedThumbnails.has(video.id) ? 0 : 1 }}
                />

                {failedThumbnails.has(video.id) && (
                  <ThumbnailPlaceholder>
                    <LoadingText>Thumbnail is being generated</LoadingText>
                    <LoadingDots>
                      <Dot delay="0s" />
                      <Dot delay="0.2s" />
                      <Dot delay="0.4s" />
                    </LoadingDots>
                  </ThumbnailPlaceholder>
                )}
              </ThumbnailImageWrapper>
            </ThumbnailCard>
          );
        })}
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.div`
  width: 240px;
  background: ${({ theme }) =>
    theme.colors.background === "#ffffff" ? "#111827" : "#000"};
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100vh - 110px);
  overflow-y: auto;
  position: relative;
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "none"
      : "8px 0 24px rgba(255, 255, 255, 0.25)"};

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: ${({ theme }) =>
      theme.colors.background === "#ffffff"
        ? "none"
        : "none"};
  }

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
  position: relative;
`;

const ThumbnailCard = styled.div<{ $open: boolean }>`
  border: none;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
  padding: 0;
  background: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "rgba(255, 255, 255, 0.05)"
      : "#333"};
  transition: 0.25s;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    background: ${({ theme }) =>
      theme.colors.background === "#ffffff"
        ? "rgba(255, 255, 255, 0.1)"
        : "#444"};
  }

  &:hover ${ThumbnailImageWrapper} {
    max-height: 140px;
    opacity: 1;
    transform: translateY(0);
  }

  ${({ $open }) =>
    $open &&
    `
    ${ThumbnailImageWrapper} {
      max-height: 140px;
      opacity: 1;
      transform: translateY(0);
    }
  `}
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

const EditInput = styled.input`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #e5e7eb;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #6366f1;
  border-radius: 4px;
  padding: 4px 8px;
  outline: none;

  &:focus {
    border-color: #ec4899;
    background: rgba(255, 255, 255, 0.15);
  }
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

  &:first-child:hover {
    background: rgba(99, 102, 241, 0.2);
    color: #6366f1;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
`;

const ThumbnailPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 120px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const LoadingText = styled.div`
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
`;

const Dot = styled.div<{ delay: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  animation: bounce 1.4s infinite ease-in-out both;
  animation-delay: ${(props) => props.delay};

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
