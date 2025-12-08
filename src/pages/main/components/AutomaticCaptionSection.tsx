import styled from "styled-components";
import analysisImage from "../assets/AutomaticCaption.png";
import {
  slideInAnimationCSS,
  useSlideInAnimation,
} from "@main/hooks/useSlideInAnimation";
import { useTranslation } from "react-i18next";

export default function AutomaticCaptionSection() {
  const [ref, isVisible] = useSlideInAnimation();
  const { t } = useTranslation();

  return (
    <SectionWrapper ref={ref}>
      <Content $visible={isVisible}>
        <ImageBlock>
          <StyledImage src={analysisImage} alt="AI analyzing video content" />
        </ImageBlock>

        <TextBlock>
          <Title>{t('autoCaption.title')}</Title>
          <Description>
            {t('autoCaption.description')}
          </Description>

          <FeatureList>
            <Feature>
              <Icon>🌍</Icon>
              <FeatureText>
                <FeatureTitle>{t('autoCaption.feature1Title')}</FeatureTitle>
                <FeatureDescription>
                  {t('autoCaption.feature1Description')}
                </FeatureDescription>
              </FeatureText>
            </Feature>
            <Feature>
              <Icon>🎨</Icon>
              <FeatureText>
                <FeatureTitle>{t('autoCaption.feature2Title')}</FeatureTitle>
                <FeatureDescription>
                  {t('autoCaption.feature2Description')}
                </FeatureDescription>
              </FeatureText>
            </Feature>
          </FeatureList>
        </TextBlock>
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
