import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import routePath from "@router/routePath";
import PackagesGrid from "src/pages/credit/components/PackagesGrid";
import {
  slideInAnimationCSS,
  useSlideInAnimation,
} from "@main/hooks/useSlideInAnimation";

export default function MockPackages() {
  const [ref, isVisible] = useSlideInAnimation();
  const navigate = useNavigate();

  return (
    <MockPackagesWrapper ref={ref} $visible={isVisible}>
      <SectionTitle>Choose Your Package</SectionTitle>
      <PackagesGrid
        selectedAmount={1}
        setSelectedAmount={() => navigate(routePath.CREDIT)}
      />
    </MockPackagesWrapper>
  );
}

const MockPackagesWrapper = styled.div<{ $visible: boolean }>`
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
