import styled from "styled-components";
import a from "../assets/Long2ShortTextHorizontal.png";

export default function HeroSection() {
  return (
    <HeroSectionWrapper>
      <HeroContent>
        <Title>Turn Long Videos Into Viral Shorts in Minutes</Title>
        <Subtitle>
          AI-powered video summarization, analysis, and editing for content
          creators who want to maximize their reach across all platforms
        </Subtitle>
        <ButtonWrapper>
          <DownloadButton>Get Started</DownloadButton>
          <ProductHuntBadge>Reduce your workload</ProductHuntBadge>
        </ButtonWrapper>
      </HeroContent>
      <PreviewImage src={a} alt="App preview" />
    </HeroSectionWrapper>
  );
}

const HeroSectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  margin: 80px auto;
  padding: 0 40px;
  gap: 60px;
  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  @media (max-width: 900px) {
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  color: #111;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DownloadButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 26px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    opacity: 0.9;
  }
`;

const ProductHuntBadge = styled.div`
  background-color: #f3f3f3;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.9rem;
  color: #555;
  font-weight: 500;
`;

const PreviewImage = styled.img`
  flex: 1;
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
  /* box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1); */
`;
