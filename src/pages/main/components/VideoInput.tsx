import { useState } from "react";
import styled from "styled-components";

export default function VideoInput() {
  const [mode, setMode] = useState<"youtube" | "file">("youtube");

  return (
    <VideoInputWrapper>
      <ToggleWrapper>
        <ToggleButton
          $active={mode === "youtube"}
          onClick={() => setMode("youtube")}
        >
          YouTube
        </ToggleButton>
        <ToggleButton $active={mode === "file"} onClick={() => setMode("file")}>
          File Upload
        </ToggleButton>
      </ToggleWrapper>

      <InputWrapper>
        <Slider $activeMode={mode}>
          <Slide>
            <StyledInput placeholder="Paste YouTube link..." />
            <GenerateButton>Generate</GenerateButton>
          </Slide>
          <Slide>
            <FileLabel>
              <FileInput type="file" />
              Drop or select a file
            </FileLabel>
            <GenerateButton>Upload</GenerateButton>
          </Slide>
        </Slider>
      </InputWrapper>
    </VideoInputWrapper>
  );
}

const VideoInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 720px;
  margin: 60px auto;
`;

const ToggleWrapper = styled.div`
  display: flex;
  background: #f2f3f5;
  border-radius: 10px;
  padding: 4px;
  width: fit-content;
`;

const ToggleButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active: active }) => (active ? "#fff" : "transparent")};
  color: ${({ $active: active }) => (active ? "#111" : "#777")};
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  box-shadow: ${({ $active: active }) =>
    active ? "0 2px 8px rgba(0,0,0,0.08)" : "none"};

  &:hover {
    color: #111;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Slider = styled.div<{ $activeMode: "youtube" | "file" }>`
  display: flex;
  width: 200%;
  transform: ${({ $activeMode: activeMode }) =>
    activeMode === "youtube" ? "translateX(0)" : "translateX(-50%)"};
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Slide = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  color: #444;
  background: transparent;
  padding: 10px;
  &::placeholder {
    color: #aaa;
  }
`;

const FileLabel = styled.label`
  flex: 1;
  border: 2px dashed #ccc;
  border-radius: 10px;
  text-align: center;
  padding: 12px;
  color: #777;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border-color: #999;
    background: #fafafa;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const GenerateButton = styled.button`
  background-color: #0e1116;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.15s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;
