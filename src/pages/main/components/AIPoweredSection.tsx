import styled from "styled-components";
import analysisImage from "../assets/AIPoweredAnalysis.png";
import {
  slideInAnimationCSS,
  useSlideInAnimation,
} from "@main/hooks/useSlideInAnimation";
import { BrainIcon } from "src/icons/BrainIcon";
import { ChartIcon } from "src/icons/ChartIcon";
import { GearIcon } from "src/icons/GearIcon";

export default function AIPoweredSection() {
  const [ref, isVisible] = useSlideInAnimation();

  return (
    <SectionWrapper ref={ref}>
      <Content $visible={isVisible}>
        <TextBlock>
          <Title>AI-Powered Summarization</Title>
          <Description>
            Our advanced AI analyzes your long-form content and identifies the
            most engaging moments automatically. Using dual-branched highlight
            detection model, Long2Short understands context, motion, and
            audience engagement patterns to extract the clips that will perform
            best.
          </Description>

          <FeatureList>
            <Feature>
              <IconWrapper>
                <BrainIcon size="24px" color="#6366f1" />
              </IconWrapper>
              <FeatureText>
                <FeatureTitle>Multi-modal context analysis</FeatureTitle>
                <FeatureDescription>
                  Context aware highlight extraction based video summarization
                </FeatureDescription>
              </FeatureText>
            </Feature>
            <Feature>
              <IconWrapper>
                <ChartIcon size="24px" color="#6366f1" />
              </IconWrapper>
              <FeatureText>
                <FeatureTitle>Real-data based</FeatureTitle>
                <FeatureDescription>
                  Tested over real highlight data that reflects true virality
                </FeatureDescription>
              </FeatureText>
            </Feature>
            <Feature>
              <IconWrapper>
                <GearIcon size="24px" color="#6366f1" />
              </IconWrapper>
              <FeatureText>
                <FeatureTitle>Automated post-processing</FeatureTitle>
                <FeatureDescription>
                  Reduce your work by automating clip cutting & merging,
                  portrait change
                </FeatureDescription>
              </FeatureText>
            </Feature>
          </FeatureList>
        </TextBlock>

        <ImageBlock>
          <StyledImage src={analysisImage} alt="AI analyzing video content" />
        </ImageBlock>
      </Content>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  display: flex;
  justify-content: center;
  padding: 100px 40px;
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#fff" : "#000"};
`;

const Content = styled.div<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  gap: 80px;

  ${slideInAnimationCSS}

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 40px;
    text-align: center;
  }
`;

const TextBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#111" : "white"};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#555" : "white"};
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
`;

const Feature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FeatureTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#222" : "white"};
`;

const FeatureDescription = styled.div`
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#666" : "white"};
  font-size: 0.95rem;
`;

const ImageBlock = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  object-fit: cover;
`;
