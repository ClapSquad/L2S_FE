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
              user={video.user}
              method={video.method as "llm_only" | "echofusion"}
              videoUrl={video.result_url}
              thumbnail={video.thumbnail_path}
              containerRef={containerRef}
            />
          ))}
        </CardsContainer>
      )}
    </RecentlyProcessedVideosWrapper>
  );
}

interface VideoCardProps {
  videoUrl: string;
  thumbnail: string;
  user: string;
  method: "llm_only" | "echofusion";
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function VideoCard({
  videoUrl,
  thumbnail,
  user,
  method,
  containerRef,
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current || !containerRef.current) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const scale = 3;
    const padding = 10; // 경계로부터의 여백

    // 스케일된 카드의 실제 크기
    const scaledWidth = cardRect.width * scale;
    const scaledHeight = cardRect.height * scale;

    // 카드의 현재 중심점 (컨테이너 기준)
    const cardCenterX = cardRect.left - containerRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top - containerRect.top + cardRect.height / 2;

    // 스케일 후 카드가 차지할 영역
    const scaledLeft = cardCenterX - scaledWidth / 2;
    const scaledRight = cardCenterX + scaledWidth / 2;
    const scaledTop = cardCenterY - scaledHeight / 2;
    const scaledBottom = cardCenterY + scaledHeight / 2;

    let offsetX = 0;
    let offsetY = 0;

    // 가로 방향 조정
    if (scaledLeft < padding) {
      // 왼쪽으로 넘어가는 경우
      offsetX = padding - scaledLeft;
    } else if (scaledRight > containerRect.width - padding) {
      // 오른쪽으로 넘어가는 경우
      offsetX = containerRect.width - padding - scaledRight;
    }

    // 세로 방향 조정
    if (scaledTop < padding) {
      // 위로 넘어가는 경우
      offsetY = padding - scaledTop;
    } else if (scaledBottom > containerRect.height - padding) {
      // 아래로 넘어가는 경우
      offsetY = containerRect.height - padding - scaledBottom;
    }

    setOffset({ x: offsetX, y: offsetY });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <CardWrapper
      ref={cardRef}
      $hovered={isHovered}
      $offset={offset}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <UserBadge $hovered={isHovered}>{user}</UserBadge>
      <MethodBadge $hovered={isHovered}>{method}</MethodBadge>
      {isHovered ? (
        <CardVideo autoPlay muted loop src={videoUrl} />
      ) : (
        <CardThumbnail src={thumbnail} />
      )}
    </CardWrapper>
  );
}

// ---------------- Styled Components ----------------
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
  color: #1a1a2e;
  margin-bottom: 32px;
  text-align: center;
`;

const CardsContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  overflow: visible; /* 호버된 카드가 보이도록 */

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`;

const CardWrapper = styled.div<{
  $hovered: boolean;
  $offset: { x: number; y: number };
}>`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 비율
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  background-color: #000;
  z-index: ${({ $hovered }) => ($hovered ? 50 : 1)};
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease;

  transform: ${({ $hovered, $offset }) =>
    $hovered
      ? `translate(${$offset.x}px, ${$offset.y}px) scale(3)`
      : "scale(1)"};

  box-shadow: ${({ $hovered }) =>
    $hovered ? "0 20px 60px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.1)"};

  will-change: transform, box-shadow;

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
`;

const CardVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
`;
