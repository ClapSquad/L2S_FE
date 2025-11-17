import { useIsLoggedIn } from "@hooks/useIsLoggedIn";
import { useVideoUploadFile } from "@hooks/useVideoUploadFile";
import { useVideoUploadYoutube } from "@hooks/useVideoUploadYoutube";
import routePath from "@router/routePath";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function VideoInput() {
  const [mode, setMode] = useState<"youtube" | "file">("youtube");
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const [youtubeURL, setYoutubeURL] = useState<string | null>(null);
  const handleYoutubeURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && e.target.value.length > 0) {
      setYoutubeURL(e.target.value);
    }
  };

  const { progress, mutate: mutateFile } = useVideoUploadFile();
  const { mutate: mutateYoutube } = useVideoUploadYoutube();

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      navigate(routePath.LOGIN);
    }
    if (mode === "file") {
      if (!selectedFile) {
        toast.error("No file selected");
        return;
      }
      mutateFile(selectedFile);
    } else {
      try {
        if (!youtubeURL) {
          toast.error("No YouTube URL");
          return;
        }

        const url = new URL(youtubeURL);
        const videoId = url.searchParams.get("v");

        if (!videoId) {
          toast.error("Not a valid YouTube URL");
          return;
        }

        mutateYoutube({ youtube_id: videoId });
      } catch (e) {
        toast.error("Invalid URL format");
      }
    }
  };

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
            <StyledInput
              placeholder="Paste YouTube link..."
              onChange={handleYoutubeURLChange}
            />
            <GenerateButton onClick={handleButtonClick}>Create</GenerateButton>
          </Slide>
          <Slide>
            <VerticalLayout>
              <HorizontalLayout style={{ width: "100%" }}>
                {!selectedFile ? (
                  <FileLabel>
                    <FileInput type="file" onChange={handleFileChange} />
                    Drop or select a file
                  </FileLabel>
                ) : (
                  <FileInfo>
                    <strong>File:</strong> {selectedFile.name + " | "}
                    <strong>Size:</strong>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    <ClearButton onClick={() => setSelectedFile(null)}>
                      X
                    </ClearButton>
                  </FileInfo>
                )}
                <GenerateButton onClick={handleButtonClick}>
                  Upload
                </GenerateButton>
              </HorizontalLayout>
              <ProgressBar $value={progress} />
            </VerticalLayout>
          </Slide>
        </Slider>
      </InputWrapper>
    </VideoInputWrapper>
  );
}

const HorizontalLayout = styled.div`
  width: 100%;
  display: flex;
`;

const VerticalLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FileInfo = styled.div`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  background: #f5f5f5;
  font-size: 14px;
  color: #333;
  line-height: 1.4;

  div strong {
    color: #111;
  }
`;

const ClearButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ProgressBar = styled.div<{ $value: number }>`
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 10px;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ $value }) => $value}%;
    background: #4f46e5;
    transition: width 0.2s ease-out;
  }
`;

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
