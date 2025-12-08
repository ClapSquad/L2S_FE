import { useIsLoggedIn } from "@hooks/useIsLoggedIn";
import { useVideoUploadFile } from "@hooks/useVideoUploadFile";
import { useVideoUploadYoutube } from "@hooks/useVideoUploadYoutube";
import routePath, { dashboardSubPath } from "@router/routePath";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from "src/apis/hooks/useMe";
import { showCreditConfirmToast } from "./ConfirmToast";
import { CoinIcon } from "src/icons/CoinIcon";

export default function VideoInput() {
  const [mode, setMode] = useState<"youtube" | "file">("file");
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: meData } = useMe();
  const [isDragging, setIsDragging] = useState(false);

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

  const {
    progress,
    mutate: mutateFile,
    isPending: isFileUploading,
  } = useVideoUploadFile();
  const { mutate: mutateYoutube, isPending: isYoutubeUploading } =
    useVideoUploadYoutube();

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      navigate(routePath.LOGIN);
      return;
    }
    if (meData!.user.credit <= 0) {
      showCreditConfirmToast({
        message: "Insufficient credits, Get more?",
        onYes: () => {
          navigate(routePath.CREDIT);
        },
      });
      return;
    }
    if (mode === "file") {
      if (!selectedFile) {
        toast.error("No file selected");
        return;
      }
      mutateFile(selectedFile, {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["myvideo"],
            exact: true,
          });
          navigate(dashboardSubPath.R_VIDEO(data.video_id));
        },
      });
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

        mutateYoutube(
          { youtube_id: videoId },
          {
            onSuccess: (data) => {
              queryClient.invalidateQueries({
                queryKey: ["myvideo"],
                exact: true,
              });
              navigate(dashboardSubPath.R_VIDEO(data.video_id));
            },
          }
        );
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
            <GenerateButton
              onClick={handleButtonClick}
              disabled={isYoutubeUploading}
            >
              {isYoutubeUploading ? (
                <ClipLoader color="white" size={15} />
              ) : (
                <>
                  Create (1
                  <CoinIcon size="14px" color="currentColor" />)
                </>
              )}
            </GenerateButton>
          </Slide>
          <Slide>
            <VerticalLayout>
              <HorizontalLayout style={{ width: "100%" }}>
                <DropZone
                  $dragging={isDragging}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (
                      e.dataTransfer.files &&
                      e.dataTransfer.files.length > 0
                    ) {
                      setSelectedFile(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() =>
                    document.getElementById("fileInputHidden")?.click()
                  }
                >
                  {selectedFile ? (
                    <FileInfo>
                      <strong>File:</strong> {selectedFile.name} |{" "}
                      <strong>Size:</strong>{" "}
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      <ClearButton
                        onClick={() => {
                          setSelectedFile(null);
                          const fileInput = document.getElementById(
                            "fileInputHidden"
                          ) as HTMLInputElement;
                          if (fileInput) fileInput.value = "";
                        }}
                      >
                        X
                      </ClearButton>
                    </FileInfo>
                  ) : (
                    "Drop or click to select a file"
                  )}
                </DropZone>

                <FileInput
                  id="fileInputHidden"
                  type="file"
                  onChange={handleFileChange}
                />

                <GenerateButton
                  onClick={handleButtonClick}
                  disabled={isFileUploading}
                >
                  {isFileUploading ? (
                    <ClipLoader color="white" size={15} />
                  ) : (
                    <>
                      Upload (1
                      <CoinIcon size="14px" color="currentColor" />)
                    </>
                  )}
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

const DropZone = styled.div<{ $dragging: boolean }>`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  text-align: center;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#555" : "white"};
  cursor: pointer;
  border: ${({ $dragging, theme }) =>
    $dragging
      ? "2px dashed #4f46e5"
      : theme.colors.background === "#ffffff"
        ? "2px dashed #ccc"
        : "none"};
  background: ${({ $dragging, theme }) =>
    $dragging
      ? "#eef2ff"
      : theme.colors.background === "#ffffff"
        ? "#fafafa"
        : "#333"};
  transition: all 0.2s ease-in-out;
`;

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
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#f5f5f5" : "#333"};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#333" : "white"};
  line-height: 1.4;

  div strong {
    color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#111" : "white"};
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
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#f2f3f5" : "#333"};
  border-radius: 10px;
  padding: 4px;
  width: fit-content;
`;

const ToggleButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active: active, theme }) =>
    active
      ? (theme.colors.background === "#ffffff" ? "#fff" : "#555")
      : "transparent"};
  color: ${({ $active: active, theme }) =>
    active
      ? (theme.colors.background === "#ffffff" ? "#111" : "#fff")
      : (theme.colors.background === "#ffffff" ? "#777" : "#999")};
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
    color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#111" : "#fff"};
  }
`;

const InputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#fff" : "#000"};
  border: 1px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#e5e7eb" : "#666"};
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "0 2px 6px rgba(0, 0, 0, 0.05)"
      : "0 8px 24px rgba(255, 255, 255, 0.25)"};
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
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#444" : "white"};
  background: transparent;
  padding: 10px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#aaa" : "white"};
  }
`;

const FileInput = styled.input`
  display: none;
`;

const GenerateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  background-color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#0e1116" : "white"};
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#fff" : "#000"};
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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#fff" : "#000"};
  }
`;
