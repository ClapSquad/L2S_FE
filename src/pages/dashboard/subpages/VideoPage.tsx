import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useFetchVideoDetail } from "../hooks/useFetchVideoDetail";
import { useDeleteMyVideo } from "../hooks/useDeleteMyVideo";
import { API } from "@apis/endpoints";
import { BarLoader, BeatLoader } from "react-spinners";
import { ToggleButton } from "@components/Toggle";
import { useSummarize } from "../hooks/useSummarize";
import { useMyJob } from "../hooks/useMyJob";
import { useJobStatus } from "../hooks/useJobStatus";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { useQueryClient } from "@tanstack/react-query";

type MethodType = "llm_only" | "echofusion";

function A({ job_id }: { job_id: string }) {
  const { data, isLoading, isError } = useJobStatus({ id: job_id });

  if (isLoading) return <>Loading job data...</>;
  if (isError) return <>Couldn't retrive your job</>;
  if (!data) return;

  return (
    <div>
      {data.result_url && (
        <VideoWithRetry file_path={data.result_url} retryInterval={5000} />
      )}
      <p>Method: {data.method}</p>
      <p>Status: {data.status}</p>
      {data.error_message && <p>Error: {data.error_message}</p>}
      <p>Created at {data.created_at}</p>
      <p>Started at {data.started_at}</p>
      <p>Completed at {data.completed_at}</p>
    </div>
  );
}

export default function VideoPage() {
  const id = useParams().id!;
  const { data } = useFetchVideoDetail({ id });
  const { mutate: mutateDelete } = useDeleteMyVideo();
  const { mutate: mutateSummarize } = useSummarize();
  const { data: jobData } = useMyJob({ video_id: id });
  const { mutate: mutateDeleteJob } = useDeleteJob();

  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState<MethodType>("echofusion");
  const [subtitle, setSubtitle] = useState(false);
  const [vertical, setVertical] = useState(false);

  const queryClient = useQueryClient();

  if (!data) return null;

  return (
    <DashBoardPageWrapper>
      <Container>
        <Header>
          <HeaderContent>
            <TitleSection>
              <Title>Video Review</Title>
              <Subtitle>Review and process your video content</Subtitle>
            </TitleSection>
            <DownloadButton
              href={`${import.meta.env.VITE_BACKEND_API_URL}${
                API.VIDEO.DOWNLOAD
              }?video_id=${id}`}
              download
            >
              <DownloadIcon>↓</DownloadIcon>
              Download Original
            </DownloadButton>
          </HeaderContent>
        </Header>

        <VideoContainer>
          {loading && (
            <LoadingOverlay>
              <LoadingContent>
                <LoadingSpinner />
                <LoadingText>Loading video...</LoadingText>
                <BarLoader color="#8b5cf6" width="200px" height="4px" />
              </LoadingContent>
            </LoadingOverlay>
          )}
          {data?.file_path && (
            <Video
              src={
                data.file_path.startsWith("http")
                  ? data.file_path
                  : `${import.meta.env.VITE_BACKEND_API_URL}${data.file_path}`
              }
              controls
              onLoadedData={() => setLoading(false)}
              style={{ opacity: loading ? 0 : 1 }}
            />
          )}
        </VideoContainer>

        <ProcessingCard>
          <CardHeader>
            <CardTitle>Processing Options</CardTitle>
            <CardDescription>
              Configure how you want to process this video
            </CardDescription>
          </CardHeader>

          <OptionsGrid>
            <OptionItem>
              <OptionHeader>
                <OptionIcon>⚡</OptionIcon>
                <OptionInfo>
                  <OptionTitle>Processing Method</OptionTitle>
                  <OptionDesc>
                    Choose your preferred processing algorithm
                  </OptionDesc>
                </OptionInfo>
              </OptionHeader>
              <Select
                value={method}
                onChange={(e) => setMethod(e.target.value as MethodType)}
              >
                <option value="llm_only">
                  LLM - Faster, verbal videos only
                </option>
                <option value="echofusion">
                  EchoFusion - Slower, deep-search
                </option>
              </Select>
            </OptionItem>

            <OptionItem>
              <OptionHeader>
                <OptionIcon>💬</OptionIcon>
                <OptionInfo>
                  <OptionTitle>Subtitles</OptionTitle>
                  <OptionDesc>Add subtitles to your video</OptionDesc>
                </OptionInfo>
              </OptionHeader>
              <ToggleButton isOn={subtitle} setIsOn={setSubtitle} />
            </OptionItem>

            <OptionItem>
              <OptionHeader>
                <OptionIcon>📱</OptionIcon>
                <OptionInfo>
                  <OptionTitle>Vertical Format</OptionTitle>
                  <OptionDesc>Convert to 9:16 ratio for mobile</OptionDesc>
                </OptionInfo>
              </OptionHeader>
              <ToggleButton isOn={vertical} setIsOn={setVertical} />
            </OptionItem>
          </OptionsGrid>

          <GenerateButton
            onClick={() =>
              mutateSummarize(
                {
                  video_id: id,
                  method,
                  subtitle,
                  vertical,
                },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ["job", "my", id],
                    });
                  },
                }
              )
            }
          >
            <ButtonIcon>✨</ButtonIcon>
            Generate Shorts
          </GenerateButton>
        </ProcessingCard>

        <ResultSection>
          <SectionTitle>Generated Result</SectionTitle>
          {jobData?.map((job) => {
            return (
              <details key={job.job_id}>
                <summary>
                  job id: {job.job_id} method: {job.method} status: {job.status}{" "}
                  <button
                    onClick={() =>
                      mutateDeleteJob(
                        { id: job.job_id },
                        {
                          onSuccess: () => {
                            queryClient.invalidateQueries({
                              queryKey: ["job", "my", id],
                            });
                          },
                        }
                      )
                    }
                  >
                    x
                  </button>
                </summary>
                <A job_id={job.job_id} />
              </details>
            );
          })}
        </ResultSection>

        <DetailsAccordion>
          <summary>
            <AccordionHeader>
              <span>Technical Details</span>
              <AccordionIcon>▼</AccordionIcon>
            </AccordionHeader>
          </summary>
          <DetailsContent>
            <DetailRow>
              <DetailLabel>Video ID</DetailLabel>
              <DetailValue>{data?.id}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Uploader ID</DetailLabel>
              <DetailValue>{data?.user_id}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>YouTube ID</DetailLabel>
              <DetailValue>{data?.youtube_id}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>File Path</DetailLabel>
              <DetailValue>{data?.file_path}</DetailValue>
            </DetailRow>
          </DetailsContent>
        </DetailsAccordion>

        <DangerZone>
          <DangerHeader>
            <DangerTitle>Danger Zone</DangerTitle>
            <DangerDescription>Irreversible actions</DangerDescription>
          </DangerHeader>
          <DeleteButton onClick={() => mutateDelete(id)}>
            <span>🗑️</span>
            Delete Video Permanently
          </DeleteButton>
        </DangerZone>
      </Container>
    </DashBoardPageWrapper>
  );
}

const VideoWithRetry = ({
  file_path,
  retryInterval = 15000,
}: {
  file_path: string;
  retryInterval: number;
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: number;

    const loadVideo = async () => {
      try {
        const response = await fetch(file_path);

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setVideoUrl(url);
          setLoading(false);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.log("Video not ready yet...");
      }
    };

    loadVideo();
    intervalId = setInterval(loadVideo, retryInterval);

    return () => {
      clearInterval(intervalId);
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [file_path]);

  return (
    <ResultContainer>
      {loading && (
        <LoadingState>
          <LoadingStateIcon>⏳</LoadingStateIcon>
          <LoadingStateText>
            Video generation in progress or not started yet...
          </LoadingStateText>
          <BeatLoader color="#8b5cf6" size={10} />
        </LoadingState>
      )}
      {videoUrl && (
        <Video
          src={videoUrl}
          controls
          style={{ display: loading ? "none" : "block" }}
        />
      )}
    </ResultContainer>
  );
};

// Styled Components
const DashBoardPageWrapper = styled.div`
  background: #ffffff;
  height: calc(100vh - 150px);
  padding: 40px 20px;
  overflow-y: auto;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-bottom: 40px;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const TitleSection = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #64748b;
  margin: 0;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: white;
  color: #6366f1;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #6366f1;
    color: white;
    border-color: #6366f1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DownloadIcon = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const VideoContainer = styled.div`
  position: relative;
  background: #1e293b;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  aspect-ratio: 16 / 9;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  z-index: 10;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(139, 92, 246, 0.1);
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: #cbd5e1;
  font-size: 15px;
  font-weight: 500;
  margin: 0;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.3s ease;
`;

const ProcessingCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
`;

const CardHeader = styled.div`
  margin-bottom: 28px;
`;

const CardTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 6px 0;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

const OptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8fafc;
  border-radius: 14px;
  border: 2px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    border-color: #e2e8f0;
  }
`;

const OptionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
`;

const OptionIcon = styled.div`
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const OptionInfo = styled.div`
  flex: 1;
`;

const OptionTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2px;
`;

const OptionDesc = styled.div`
  font-size: 13px;
  color: #64748b;
`;

const Select = styled.select`
  padding: 10px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

const GenerateButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonIcon = styled.span`
  font-size: 20px;
`;

const ResultSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 16px 0;
`;

const ResultContainer = styled.div`
  background: #1e293b;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  aspect-ratio: 16 / 9;
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 60px 20px;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  height: 100%;
`;

const LoadingStateIcon = styled.div`
  font-size: 48px;
`;

const LoadingStateText = styled.p`
  color: #cbd5e1;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  margin: 0;
  max-width: 300px;
`;

const DetailsAccordion = styled.details`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;

  summary {
    cursor: pointer;
    user-select: none;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }
  }
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;

  &:hover {
    color: #6366f1;
  }
`;

const AccordionIcon = styled.span`
  font-size: 12px;
  color: #64748b;
  transition: transform 0.2s ease;

  details[open] & {
    transform: rotate(180deg);
  }
`;

const DetailsContent = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const DetailRow = styled.div`
  display: flex;
  gap: 16px;
`;

const DetailLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  min-width: 120px;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #1e293b;
  word-break: break-all;
  font-family: "Monaco", "Courier New", monospace;
  background: #f8fafc;
  padding: 4px 8px;
  border-radius: 6px;
  flex: 1;
`;

const DangerZone = styled.div`
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 16px;
  padding: 24px;
`;

const DangerHeader = styled.div`
  margin-bottom: 16px;
`;

const DangerTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #991b1b;
  margin: 0 0 4px 0;
`;

const DangerDescription = styled.p`
  font-size: 13px;
  color: #b91c1c;
  margin: 0;
`;

const DeleteButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #b91c1c;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;
