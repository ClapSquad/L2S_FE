import styled from "styled-components";
import {
  slideInAnimationCSS,
  useSlideInAnimation,
} from "@main/hooks/useSlideInAnimation";
import { useFetchRecentVideos } from "@main/hooks/useFetchRecentVideos";
import { ClipLoader } from "react-spinners";
import { useState, useRef } from "react";

export default function RecentlyProcessedVideos() {
  const [ref, isVisible] = useSlideInAnimation();
  const { data, isLoading } = useFetchRecentVideos({ limit: 10 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <RecentlyProcessedVideosWrapper ref={ref} $visible={isVisible}>
      <SectionTitle>Recently processed</SectionTitle>
      {isLoading ? (
        <ClipLoader />
      ) : (
        <CardsContainer ref={containerRef}>
          {data?.videos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              user={video.user}
              method={video.method as "llm_only" | "echofusion"}
              videoUrl={video.result_url}
              thumbnail={video.thumbnail_path}
              containerRef={containerRef}
              isHovered={(hoveredCardId ?? "") === video.id.toString()}
              onHoverChange={setHoveredCardId}
            />
          ))}
        </CardsContainer>
      )}
    </RecentlyProcessedVideosWrapper>
  );
}

interface VideoCardProps {
  id: number;
  videoUrl: string;
  thumbnail: string;
  user: string;
  method: "llm_only" | "echofusion";
  containerRef: React.RefObject<HTMLDivElement | null>;
  isHovered: boolean;
  onHoverChange: (id: string | null) => void;
}

function VideoCard({
  id,
  videoUrl,
  thumbnail,
  user,
  method,
  containerRef,
  isHovered,
  onHoverChange,
}: VideoCardProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current || !containerRef.current) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const scale = 2;
    const padding = 20;

    const scaledWidth = cardRect.width * scale;
    const scaledHeight = cardRect.height * scale;

    const cardCenterX = cardRect.left - containerRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top - containerRect.top + cardRect.height / 2;

    const scaledLeft = cardCenterX - scaledWidth / 2;
    const scaledRight = cardCenterX + scaledWidth / 2;
    const scaledTop = cardCenterY - scaledHeight / 2;
    const scaledBottom = cardCenterY + scaledHeight / 2;

    let offsetX = 0;
    let offsetY = 0;

    if (scaledLeft < padding) {
      offsetX = padding - scaledLeft;
    } else if (scaledRight > containerRect.width - padding) {
      offsetX = containerRect.width - padding - scaledRight;
    }

    if (scaledTop < padding) {
      offsetY = padding - scaledTop;
    } else if (scaledBottom > containerRect.height - padding) {
      offsetY = containerRect.height - padding - scaledBottom;
    }

    setOffset({ x: offsetX, y: offsetY });
    onHoverChange(id.toString());
  };

  const handleMouseLeave = () => {
    onHoverChange(null);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <CardContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 호버 영역을 유지하는 투명한 오버레이 */}
      <HoverArea $hovered={isHovered} />

      <CardWrapper ref={cardRef} $hovered={isHovered} $offset={offset}>
        <UserBadge $hovered={isHovered}>{user}</UserBadge>
        <MethodBadge $hovered={isHovered}>{method}</MethodBadge>
        {isHovered ? (
          <CardVideo
            autoPlay
            muted
            loop
            controls
            controlsList="nodownload"
            src={videoUrl}
          />
        ) : (
          <CardThumbnail src={thumbnail} />
        )}
      </CardWrapper>
    </CardContainer>
  );
}

const RecentlyProcessedVideosWrapper = styled.div<{ $visible: boolean }>`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 60px;
  ${slideInAnimationCSS};
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#1a1a2e" : "white"};
  margin-bottom: 32px;
  text-align: center;
`;

const CardsContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  overflow: visible;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`;

// 새로운 컨테이너: 마우스 이벤트를 감지하는 영역
const CardContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 비율 유지
`;

// 호버 상태를 유지하기 위한 투명 오버레이
const HoverArea = styled.div<{ $hovered: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ $hovered }) => ($hovered ? 51 : 0)};
  pointer-events: ${({ $hovered }) => ($hovered ? "auto" : "none")};
`;

const CardWrapper = styled.div<{
  $hovered: boolean;
  $offset: { x: number; y: number };
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  background-color: #000;
  z-index: ${({ $hovered }) => ($hovered ? 50 : 1)};
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease;

  transform: ${({ $hovered, $offset }) =>
    $hovered
      ? `translate(${$offset.x}px, ${$offset.y}px) scale(2)`
      : "scale(1)"};

  box-shadow: ${({ $hovered }) =>
    $hovered ? "0 20px 60px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.1)"};

  will-change: transform, box-shadow;
  pointer-events: none; // 마우스 이벤트는 CardContainer에서 처리

  &:hover {
    box-shadow: ${({ $hovered }) => !$hovered && "0 4px 12px rgba(0,0,0,0.15)"};
  }
`;

const CardThumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

const CardVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: auto; // 비디오 컨트롤은 클릭 가능하게
`;

const UserBadge = styled.div<{ $hovered: boolean }>`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: ${({ $hovered }) => ($hovered ? "10px" : "12px")};
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 8px;
  z-index: 2;
  transition: font-size 0.3s ease;
  pointer-events: none;
`;

const MethodBadge = styled.div<{ $hovered: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(255, 255, 255, 0.85);
  color: #1a1a2e;
  font-size: ${({ $hovered }) => ($hovered ? "10px" : "12px")};
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 8px;
  z-index: 2;
  transition: font-size 0.3s ease;
  pointer-events: none;
`;
