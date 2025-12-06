import styled from "styled-components";
import { useEffect } from "react";

export type SubtitleStyle = "simple1" | "simple2" | "simple3" | "casual" | "dynamic";

interface SubtitleStyleSelectorProps {
  value: SubtitleStyle;
  onChange: (style: SubtitleStyle) => void;
}

export default function SubtitleStyleSelector({
  value,
  onChange,
}: SubtitleStyleSelectorProps) {
  useEffect(() => {
    // Start animations for dynamic
    const dynamicInterval = setInterval(() => {
      const dynamicWords = document.querySelectorAll('.dynamic-preview-word');
      dynamicWords.forEach((word) => {
        word.classList.remove('animate-active');
      });
      const currentTime = Math.floor(Date.now() / 800) % dynamicWords.length;
      if (dynamicWords[currentTime]) {
        dynamicWords[currentTime].classList.add('animate-active');
      }
    }, 800);

    return () => {
      clearInterval(dynamicInterval);
    };
  }, []);

  return (
    <SelectorWrapper>
      <StyleOption
        $active={value === "simple1"}
        onClick={() => onChange("simple1")}
      >
        <StyleName>Simple 1</StyleName>
        <StyleDescription>White text + black outline</StyleDescription>
        <PreviewContainer>
          <PreviewText $style="simple1">Sample Text</PreviewText>
          <PreviewText $style="simple1">샘플 텍스트</PreviewText>
        </PreviewContainer>
      </StyleOption>

      <StyleOption
        $active={value === "simple2"}
        onClick={() => onChange("simple2")}
      >
        <StyleName>Simple 2</StyleName>
        <StyleDescription>Black text + white background</StyleDescription>
        <PreviewContainer>
          <PreviewText $style="simple2">Sample Text</PreviewText>
          <PreviewText $style="simple2">샘플 텍스트</PreviewText>
        </PreviewContainer>
      </StyleOption>

      <StyleOption
        $active={value === "simple3"}
        onClick={() => onChange("simple3")}
      >
        <StyleName>Simple 3</StyleName>
        <StyleDescription>White text + black background</StyleDescription>
        <PreviewContainer>
          <PreviewText $style="simple3">Sample Text</PreviewText>
          <PreviewText $style="simple3">샘플 텍스트</PreviewText>
        </PreviewContainer>
      </StyleOption>

      <StyleOption
        $active={value === "casual"}
        onClick={() => onChange("casual")}
      >
        <StyleName>Casual</StyleName>
        <StyleDescription>White text + black outline + shadow</StyleDescription>
        <PreviewContainer>
          <PreviewText $style="casual">캐주얼 자막</PreviewText>
          <PreviewText $style="casual">Casual Text</PreviewText>
        </PreviewContainer>
      </StyleOption>

      <StyleOption
        $active={value === "dynamic"}
        onClick={() => onChange("dynamic")}
      >
        <StyleName>Dynamic</StyleName>
        <StyleDescription>Animated word-by-word emphasis</StyleDescription>
        <DynamicPreviewContainer>
          <DynamicWordRow>
            <DynamicWord className="dynamic-preview-word">This</DynamicWord>
            <DynamicWord className="dynamic-preview-word">is</DynamicWord>
          </DynamicWordRow>
          <DynamicWord className="dynamic-preview-word">dynamic</DynamicWord>
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

const PreviewContainer = styled.div`
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
  margin-top: 8px;
  align-items: flex-start;
  min-height: 50px;
`;

const DynamicPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  align-items: flex-start;
`;

const DynamicWordRow = styled.div`
  display: flex;
  gap: 2px;
`;

const PreviewText = styled.span<{ $style: string }>`
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;

  ${({ $style }) => {
    switch ($style) {
      case "simple1":
        return `
          color: white;
          text-transform: uppercase;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        `;
      case "simple2":
        return `
          color: black;
          background: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
        `;
      case "simple3":
        return `
          color: white;
          background: rgba(0, 0, 0, 0.5);
          text-transform: uppercase;
        `;
      case "casual":
        return `
          font-family: 'Jua', sans-serif;
          color: white;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        `;
      default:
        return "";
    }
  }}
`;

const DynamicWord = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  color: white;
  text-transform: uppercase;
  -webkit-text-stroke: 2px #000;
  paint-order: stroke fill;
  transition: all 0.3s ease;

  &.animate-active {
    color: #39ff14 !important;
    font-size: 14px;
  }
`;
