import styled from "styled-components";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export type SubtitleStyle = "casual" | "dynamic";

interface SubtitleStyleSelectorProps {
  value: SubtitleStyle;
  onChange: (style: SubtitleStyle) => void;
}

export default function SubtitleStyleSelector({
  value,
  onChange,
}: SubtitleStyleSelectorProps) {
  const { t } = useTranslation();
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
        <StyleName>{t("dashboard.casualStyle")}</StyleName>
        <StyleDescription>{t("dashboard.casualDesc")}</StyleDescription>
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
        <StyleName>{t("dashboard.dynamicStyle")}</StyleName>
        <StyleDescription>{t("dashboard.dynamicDesc")}</StyleDescription>
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
  border: 2px solid ${({ $active, theme }) =>
    $active
      ? (theme.colors.background === "#ffffff" ? "#9333ea" : "#6b7280")
      : (theme.colors.background === "#ffffff" ? "#e5e7eb" : "#555")};
  border-radius: 8px;
  background: ${({ $active, theme }) =>
    $active
      ? (theme.colors.background === "#ffffff" ? "#f3e8ff" : "#5b5b57ff")
      : (theme.colors.background === "#ffffff" ? "white" : "#333")};
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 140px;

  &:hover {
    border-color: ${({ $active, theme }) =>
      $active
        ? (theme.colors.background === "#ffffff" ? "#9333ea" : "#6b7280")
        : (theme.colors.background === "#ffffff" ? "#d1d5db" : "#666")};
    background: ${({ $active, theme }) =>
      $active
        ? (theme.colors.background === "#ffffff" ? "#f3e8ff" : "#5b5b57ff")
        : (theme.colors.background === "#ffffff" ? "#f9fafb" : "#444")};
  }
`;

const StyleName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#1f2937" : "white"};
  margin-bottom: 4px;
`;

const StyleDescription = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#6b7280" : "#999"};
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
  min-height: 40px;
`;

const CasualWord = styled.span`
  font-size: 18px;
  font-weight: 700;
  padding: 6px 13px;
  border-radius: 5px;
  display: inline-block;
  font-family: 'Noto Sans CJK KR', sans-serif;
  color: white;
  -webkit-text-stroke: 2.0px #000;
  paint-order: stroke fill;
  transition: all 0.3s ease;
  will-change: transform;

  &.animate-active {
    color: #FFFF00 !important;
    transform: scale(1.28);
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
  min-height: 40px;
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
  -webkit-text-stroke: 2.0px #000;
  paint-order: stroke fill;
  transition: all 0.3s ease;
  will-change: transform;

  &.animate-active {
    color: #39ff14 !important;
    transform: scale(1.28);
  }
`;
