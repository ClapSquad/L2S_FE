import styled from "styled-components";
import NavigationBar from "@components/NavigationBar";
import HeroSection from "./components/HeroSection";
import YoutubeInput from "./components/VideoInput";
import AIPoweredSection from "./components/AIPoweredSection";
import AutomaticCaptionSection from "./components/AutomaticCaptionSection";
import Footer from "./components/Footer";

export default function MainPage() {
  return (
    <>
      <NavigationBar />
      <MainPageWrapper>
        <HeroSection />
        <YoutubeInput />
        <AIPoweredSection />
        <AutomaticCaptionSection />
        <Footer />
      </MainPageWrapper>
    </>
  );
}

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
