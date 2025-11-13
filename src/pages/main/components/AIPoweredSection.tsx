import styled from "styled-components";
import analysisImage from "../assets/AIPoweredAnalysis.png";

export default function AIPoweredSection() {
  return (
    <SectionWrapper>
      <Content>
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
              <Icon>🧠</Icon>
              <FeatureText>
                <FeatureTitle>Multi-modal context analysis</FeatureTitle>
                <FeatureDescription>
                  Context aware highlight extraction based video summarization
                </FeatureDescription>
              </FeatureText>
            </Feature>
            <Feature>
              <Icon>📊</Icon>
              <FeatureText>
                <FeatureTitle>Real-data based</FeatureTitle>
                <FeatureDescription>
                  Tested over real highlight data that reflects true virality
                </FeatureDescription>
              </FeatureText>
            </Feature>
            <Feature>
              <Icon>⚙️</Icon>
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
  background: #fff;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  gap: 80px;

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
  color: #111;
`;

const Description = styled.p`
  color: #555;
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

const Icon = styled.div`
  font-size: 24px;
  line-height: 1;
`;

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FeatureTitle = styled.div`
  font-weight: 600;
  color: #222;
`;

const FeatureDescription = styled.div`
  color: #666;
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
