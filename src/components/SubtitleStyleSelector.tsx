import styled from "styled-components";
import { useEffect } from "react";

export type SubtitleStyle = "casual" | "dynamic";

interface SubtitleStyleSelectorProps {
  value: SubtitleStyle;
  onChange: (style: SubtitleStyle) => void;
}

export default function SubtitleStyleSelector({
  value,
  onChange,
}: SubtitleStyleSelectorProps) {
  useEffect(() => {
    // Start animations for dynamic and casual
    const animationInterval = setInterval(() => {
      const dynamicWords = document.querySelectorAll('.dynamic-preview-word');
      const casualWords = document.querySelectorAll('.casual-preview-word');

      dynamicWords.forEach((word) => {
        word.classList.remove('animate-active');
      });
      casualWords.forEach((word) => {
        word.classList.remove('animate-active');
      });

      const currentTime = Math.floor(Date.now() / 800) % 3;
      if (dynamicWords[currentTime]) {
        dynamicWords[currentTime].classList.add('animate-active');
      }
      if (casualWords[currentTime]) {
        casualWords[currentTime].classList.add('animate-active');
      }
    }, 800);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <SelectorWrapper>
      <StyleOption
        $active={value === "casual"}
        onClick={() => onChange("casual")}
      >
        <StyleName>Casual</StyleName>
        <StyleDescription>Animated word-by-word with casual font</StyleDescription>
        <CasualPreviewContainer>
          <CasualWord className="casual-preview-word">THIS</CasualWord>
          <CasualWord className="casual-preview-word">IS</CasualWord>
          <CasualWord className="casual-preview-word">CASUAL</CasualWord>
        </CasualPreviewContainer>
      </StyleOption>

      <StyleOption
        $active={value === "dynamic"}
        onClick={() => onChange("dynamic")}
      >
        <StyleName>Dynamic</StyleName>
        <StyleDescription>Animated word-by-word emphasis</StyleDescription>
        <DynamicPreviewContainer>
          <DynamicWord className="dynamic-preview-word">THIS</DynamicWord>
          <DynamicWord className="dynamic-preview-word">IS</DynamicWord>
          <DynamicWord className="dynamic-preview-word">DYNAMIC</DynamicWord>
        </DynamicPreviewContainer>
      </StyleOption>
    </SelectorWrapper>
  );
}

const SelectorWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
`;

const StyleOption = styled.div<{ $active: boolean }>`
  padding: 16px;
  border: 2px solid ${({ $active }) => ($active ? "#9333ea" : "#e5e7eb")};
  border-radius: 8px;
  background: ${({ $active }) => ($active ? "#f3e8ff" : "white")};
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 140px;

  &:hover {
    border-color: ${({ $active }) => ($active ? "#9333ea" : "#d1d5db")};
    background: ${({ $active }) => ($active ? "#f3e8ff" : "#f9fafb")};
  }
`;

const StyleName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
`;

const StyleDescription = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
`;

const CasualPreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CasualWord = styled.span`
  font-size: 18px;
  font-weight: 700;
  padding: 6px 13px;
  border-radius: 5px;
  display: inline-block;
  font-family: 'Noto Sans CJK KR', sans-serif;
  color: white;
  -webkit-text-stroke: 3.4px #000;
  paint-order: stroke fill;
  transition: all 0.3s ease;

  &.animate-active {
    color: #FFFF00 !important;
    font-size: 23px;
  }
`;

const DynamicPreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const DynamicWord = styled.span`
  font-size: 18px;
  font-weight: 700;
  padding: 6px 13px;
  border-radius: 5px;
  display: inline-block;
  font-family: 'Noto Sans KR', sans-serif;
  color: white;
  text-transform: uppercase;
  -webkit-text-stroke: 3.4px #000;
  paint-order: stroke fill;
  transition: all 0.3s ease;

  &.animate-active {
    color: #39ff14 !important;
    font-size: 23px;
  }
`;
