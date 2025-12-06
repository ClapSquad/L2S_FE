import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useFetchVideoDetail } from "../hooks/useFetchVideoDetail";
import { useDeleteMyVideo } from "../hooks/useDeleteMyVideo";
import { API } from "@apis/endpoints";
import { BarLoader } from "react-spinners";
import { ToggleButton } from "@components/Toggle";
import { useSummarize } from "../hooks/useSummarize";
import { useMyJob } from "../hooks/useMyJob";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { useQueryClient } from "@tanstack/react-query";
import JobCard from "../components/JobCard";

type MethodType = "llm_only" | "echofusion";

export default function VideoPage() {
  const id = useParams().id!;
  const { data } = useFetchVideoDetail({ id });
  const { mutate: mutateDelete } = useDeleteMyVideo();
  const { mutate: mutateSummarize, isPending: isSummarizing } = useSummarize();
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
              <Title>Video Studio</Title>
              <Subtitle>Transform your content into engaging shorts</Subtitle>
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

        <VideoSection>
          <SectionHeader>
            <SectionTitle>Source Video</SectionTitle>
            <VideoDuration>Original content</VideoDuration>
          </SectionHeader>
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
        </VideoSection>

        <ProcessingCard>
          <CardHeader>
            <CardIcon>⚙️</CardIcon>
            <div>
              <CardTitle>Processing Configuration</CardTitle>
              <CardDescription>
                Customize your video transformation settings
              </CardDescription>
            </div>
          </CardHeader>

          <OptionsGrid>
            <OptionCard>
              <OptionHeader>
                <OptionIconWrapper>
                  <OptionIcon>⚡</OptionIcon>
                </OptionIconWrapper>
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
                <option value="llm_only">LLM Only - Fast processing</option>
                <option value="echofusion">EchoFusion - Deep analysis</option>
              </Select>
            </OptionCard>

            <OptionCard>
              <OptionHeader>
                <OptionIconWrapper>
                  <OptionIcon>💬</OptionIcon>
                </OptionIconWrapper>
                <OptionInfo>
                  <OptionTitle>Subtitles</OptionTitle>
                  <OptionDesc>Add automatic captions</OptionDesc>
                </OptionInfo>
              </OptionHeader>
              <ToggleButton isOn={subtitle} setIsOn={setSubtitle} />
            </OptionCard>

            <OptionCard>
              <OptionHeader>
                <OptionIconWrapper>
                  <OptionIcon>📱</OptionIcon>
                </OptionIconWrapper>
                <OptionInfo>
                  <OptionTitle>Vertical Format</OptionTitle>
                  <OptionDesc>Optimize for mobile (9:16)</OptionDesc>
                </OptionInfo>
              </OptionHeader>
              <ToggleButton isOn={vertical} setIsOn={setVertical} />
            </OptionCard>
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
            disabled={isSummarizing}
          >
            {isSummarizing ? (
              <>
                <ButtonSpinner />
                Processing...
              </>
            ) : (
              <>
                <ButtonIcon>✨</ButtonIcon>
                Generate Shorts (1🪙)
              </>
            )}
          </GenerateButton>
        </ProcessingCard>

        {jobData && jobData.length > 0 && (
          <ResultSection>
            <SectionHeader>
              <SectionTitle>Generated Results</SectionTitle>
              <JobCount>
                {jobData.length} {jobData.length === 1 ? "job" : "jobs"}
              </JobCount>
            </SectionHeader>
            <JobsList>
              {jobData.map((job) => (
                <JobCard
                  key={job.job_id}
                  job_id={job.job_id}
                  onDelete={() =>
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
                />
              ))}
            </JobsList>
          </ResultSection>
        )}

        <DetailsAccordion>
          <summary>
            <AccordionHeader>
              <AccordionTitle>
                <span>🔧</span>
                Technical Details
              </AccordionTitle>
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
              <DetailValue>{data?.youtube_id || "N/A"}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>File Path</DetailLabel>
              <DetailValue>{data?.file_path}</DetailValue>
            </DetailRow>
          </DetailsContent>
        </DetailsAccordion>

        <DangerZone>
          <DangerHeader>
            <DangerIcon>⚠️</DangerIcon>
            <div>
              <DangerTitle>Danger Zone</DangerTitle>
              <DangerDescription>
                This action cannot be undone
              </DangerDescription>
            </div>
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

const DashBoardPageWrapper = styled.div`
  background: #ffffff;
  height: calc(100vh - 150px);
  padding: 40px 20px;
  overflow-y: auto;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-bottom: 48px;
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
  font-size: 42px;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 8px 0;
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #64748b;
  margin: 0;
  font-weight: 400;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: white;
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DownloadIcon = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const VideoSection = styled.div`
  margin-bottom: 32px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const VideoDuration = styled.span`
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
  padding: 6px 12px;
  background: #f1f5f9;
  border-radius: 8px;
`;

const JobCount = styled(VideoDuration)``;

const VideoContainer = styled.div`
  position: relative;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  aspect-ratio: 16 / 9;
  border: 1px solid rgba(255, 255, 255, 0.05);
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
  gap: 24px;
`;

const LoadingSpinner = styled.div`
  width: 56px;
  height: 56px;
  border: 4px solid rgba(139, 92, 246, 0.1);
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

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
  transition: opacity 0.4s ease;
`;

const ProcessingCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 40px;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const CardIcon = styled.div`
  font-size: 32px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
`;

const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
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
  margin-bottom: 32px;
`;

const OptionCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    border-color: #cbd5e1;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }
`;

const OptionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

const OptionIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const OptionIcon = styled.div`
  font-size: 24px;
`;

const OptionInfo = styled.div`
  flex: 1;
`;

const OptionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
`;

const OptionDesc = styled.div`
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
`;

const Select = styled.select`
  padding: 12px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  }
`;

const GenerateButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  letter-spacing: 0.3px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ButtonIcon = styled.span`
  font-size: 22px;
`;

const ButtonSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
`;

const ResultSection = styled.div`
  margin-bottom: 32px;
`;

const JobsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DetailsAccordion = styled.details`
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #cbd5e1;
  }

  summary {
    cursor: pointer;
    user-select: none;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }
  }

  &[open] {
    padding-bottom: 28px;
  }
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AccordionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  transition: color 0.2s ease;

  &:hover {
    color: #667eea;
  }
`;

const AccordionIcon = styled.span`
  font-size: 12px;
  color: #94a3b8;
  transition: transform 0.3s ease;

  details[open] & {
    transform: rotate(180deg);
  }
`;

const DetailsContent = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DetailRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const DetailLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  min-width: 130px;
  flex-shrink: 0;
`;

const DetailValue = styled.span`
  font-size: 13px;
  color: #334155;
  word-break: break-all;
  font-family: "Monaco", "Courier New", monospace;
  background: #f8fafc;
  padding: 8px 12px;
  border-radius: 8px;
  flex: 1;
  border: 1px solid #e2e8f0;
`;

const DangerZone = styled.div`
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 2px solid #fecaca;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.1);
`;

const DangerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const DangerIcon = styled.div`
  font-size: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  border: 2px solid #fecaca;
`;

const DangerTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #991b1b;
  margin: 0 0 4px 0;
`;

const DangerDescription = styled.p`
  font-size: 13px;
  color: #b91c1c;
  margin: 0;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);

  &:hover {
    background: #b91c1c;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(220, 38, 38, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;
