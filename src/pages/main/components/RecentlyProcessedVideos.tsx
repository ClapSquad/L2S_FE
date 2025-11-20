import styled from "styled-components";
import {
  slideInAnimationCSS,
  useSlideInAnimation,
} from "@main/hooks/useSlideInAnimation";
import { useFetchRecentVideos } from "@main/hooks/useFetchRecentVideos";
import { ClipLoader } from "react-spinners";

export default function RecentlyProcessedVideos() {
  const [ref, isVisible] = useSlideInAnimation();
  const { data, isLoading } = useFetchRecentVideos({ limit: 10 });

  return (
    <RecentlyProcessedVideosWrapper ref={ref} $visible={isVisible}>
      <SectionTitle>Recently processed</SectionTitle>
      {isLoading ? <ClipLoader /> : <>{data?.total} videos fetched</>}
    </RecentlyProcessedVideosWrapper>
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
  color: #1a1a2e;
  margin-bottom: 32px;
  text-align: center;
`;
