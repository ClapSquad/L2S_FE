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
import { useTranslation } from "react-i18next";
import { GearIcon } from "@icons/GearIcon";
import { BoltIcon } from "@icons/BoltIcon";
import { SubtitlesIcon } from "@icons/SubtitlesIcon";
import { SmartphoneIcon } from "@icons/SmartphoneIcon";
import { WrenchIcon } from "@icons/WrenchIcon";
import { WarningIcon } from "@icons/WarningIcon";
import { TrashIcon } from "@icons/TrashIcon";
import { DownloadIcon } from "@icons/DownloadIcon";
import { ExpandIcon } from "@icons/ExpandIcon";
import { CoinIcon } from "@icons/CoinIcon";
import { PaletteIcon } from "@icons/PaletteIcon";
import SubtitleStyleSelector, { type SubtitleStyle } from "@components/SubtitleStyleSelector";

type MethodType = "llm_only" | "echofusion";

export default function VideoPage() {
  const id = useParams().id!;
  const { t } = useTranslation();
  const { data } = useFetchVideoDetail({ id });
  const { mutate: mutateDelete } = useDeleteMyVideo();
  const { mutate: mutateSummarize, isPending: isSummarizing } = useSummarize();
  const { data: jobData } = useMyJob({ video_id: id });
  const { mutate: mutateDeleteJob } = useDeleteJob();

  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState<MethodType>("echofusion");
  const [subtitle, setSubtitle] = useState(false);
  const [subtitleStyle, setSubtitleStyle] = useState<SubtitleStyle>("casual");
  const [vertical, setVertical] = useState(false);

  const queryClient = useQueryClient();

  if (!data) return null;

  return (
    <DashBoardPageWrapper>
      <Container>
        <Header>
          <HeaderContent>
            <TitleSection>
              <Title>{t("dashboard.videoStudio")}</Title>
              <Subtitle>{t("dashboard.transformContent")}</Subtitle>
            </TitleSection>
            <DownloadButton
              href={`${import.meta.env.VITE_BACKEND_API_URL}${
                API.VIDEO.DOWNLOAD
              }?video_id=${id}`}
              download
            >
              <DownloadIconWrapper>
                <DownloadIcon size="18px" color="currentColor" />
              </DownloadIconWrapper>
              {t("dashboard.downloadOriginal")}
            </DownloadButton>
          </HeaderContent>
        </Header>

        <VideoSection>
          <SectionHeader>
            <SectionTitle>{t("dashboard.sourceVideo")}</SectionTitle>
            <VideoDuration>{t("dashboard.originalContent")}</VideoDuration>
          </SectionHeader>
          <VideoContainer>
            {loading && (
              <LoadingOverlay>
                <LoadingContent>
                  <LoadingSpinner />
                  <LoadingText>{t("dashboard.loadingVideo")}</LoadingText>
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
            <CardIcon>
              <GearIcon size="32px" color="white" />
            </CardIcon>
            <div>
              <CardTitle>{t("dashboard.processingConfig")}</CardTitle>
              <CardDescription>
                {t("dashboard.customizeSettings")}
              </CardDescription>
            </div>
          </CardHeader>

          <OptionsGrid>
            <OptionCard>
              <OptionHeader>
                <OptionIconWrapper>
                  <OptionIcon>
                    <BoltIcon size="31px" color="currentColor" />
                  </OptionIcon>
                </OptionIconWrapper>
                <OptionInfo>
                  <OptionTitle>{t("dashboard.processingMethod")}</OptionTitle>
                  <OptionDesc>
                    {t("dashboard.chooseAlgorithm")}
                  </OptionDesc>
                </OptionInfo>
              </OptionHeader>
              <Select
                value={method}
                onChange={(e) => setMethod(e.target.value as MethodType)}
              >
                <option value="llm_only">{t("dashboard.llmOnly")}</option>
                <option value="echofusion">{t("dashboard.echoFusion")}</option>
              </Select>
            </OptionCard>

            <OptionCard>
              <OptionHeader>
                <OptionIconWrapper>
                  <OptionIcon>
                    <SubtitlesIcon size="31px" color="currentColor" />
                  </OptionIcon>
                </OptionIconWrapper>
                <OptionInfo>
                  <OptionTitle>{t("dashboard.subtitles")}</OptionTitle>
                  <OptionDesc>{t("dashboard.addCaptions")}</OptionDesc>
                </OptionInfo>
              </OptionHeader>
              <ToggleButton isOn={subtitle} setIsOn={setSubtitle} />
            </OptionCard>

            {subtitle && (
              <SubtitleStyleCard>
                <OptionHeader>
                  <OptionIconWrapper>
                    <OptionIcon>
                      <PaletteIcon size="31px" color="currentColor" />
                    </OptionIcon>
                  </OptionIconWrapper>
                  <OptionInfo>
                    <OptionTitle>{t("dashboard.subtitleStyle")}</OptionTitle>
                    <OptionDesc>{t("dashboard.chooseAppearance")}</OptionDesc>
                  </OptionInfo>
                </OptionHeader>
                <SubtitleStyleSelector
                  value={subtitleStyle}
                  onChange={setSubtitleStyle}
                />
              </SubtitleStyleCard>
            )}

            <OptionCard>
              <OptionHeader>
                <OptionIconWrapper>
                  <OptionIcon>
                    <SmartphoneIcon size="31px" color="currentColor" />
                  </OptionIcon>
                </OptionIconWrapper>
                <OptionInfo>
                  <OptionTitle>{t("dashboard.verticalFormat")}</OptionTitle>
                  <OptionDesc>{t("dashboard.optimizeMobile")}</OptionDesc>
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
                  subtitle_style: subtitle ? subtitleStyle : null,
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
                {t("dashboard.processing")}
              </>
            ) : (
              <>
                {t("dashboard.generateShorts")}
                <CoinIconWrapper>
                  1<CoinIcon size="18px" color="#FFD700" />
                </CoinIconWrapper>
              </>
            )}
          </GenerateButton>
        </ProcessingCard>

        {jobData && jobData.length > 0 && (
          <ResultSection>
            <SectionHeader>
              <SectionTitle>{t("dashboard.generatedResults")}</SectionTitle>
              <JobCount>
                {jobData.length} {jobData.length === 1 ? t("dashboard.job") : t("dashboard.jobs")}
              </JobCount>
            </SectionHeader>
            <JobsList>
              {jobData.map((job) => (
                <JobCard
                  key={job.job_id}
                  job_id={job.job_id}
                  job_name={job.name}
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
                <WrenchIconWrapper>
                  <WrenchIcon size="20px" color="currentColor" />
                </WrenchIconWrapper>
                {t("dashboard.technicalDetails")}
              </AccordionTitle>
              <AccordionIcon>
                <ExpandIcon size="24px" color="currentColor" />
              </AccordionIcon>
            </AccordionHeader>
          </summary>
          <DetailsContent>
            <DetailRow>
              <DetailLabel>{t("dashboard.videoId")}</DetailLabel>
              <DetailValue>{data?.id}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>{t("dashboard.uploaderId")}</DetailLabel>
              <DetailValue>{data?.user_id}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>{t("dashboard.youtubeId")}</DetailLabel>
              <DetailValue>{data?.youtube_id || "N/A"}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>{t("dashboard.filePath")}</DetailLabel>
              <DetailValue>{data?.file_path}</DetailValue>
            </DetailRow>
          </DetailsContent>
        </DetailsAccordion>

        <DangerZone>
          <DangerHeader>
            <DangerIcon>
              <WarningIcon size="32px" color="currentColor" />
            </DangerIcon>
            <div>
              <DangerTitle>{t("dashboard.dangerZone")}</DangerTitle>
              <DangerDescription>
                {t("dashboard.actionCannotUndo")}
              </DangerDescription>
            </div>
          </DangerHeader>
          <DeleteButton onClick={() => mutateDelete(id)}>
            <TrashIconWrapper>
              <TrashIcon size="20px" color="white" />
            </TrashIconWrapper>
            {t("dashboard.deletePermanently")}
          </DeleteButton>
        </DangerZone>
      </Container>
    </DashBoardPageWrapper>
  );
}

const DashBoardPageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#ffffff" : "#000"};
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
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#64748b" : "white"};
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

const DownloadIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#1e293b" : "white"};
  margin: 0;
`;

const VideoDuration = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#64748b" : "#999"};
  font-weight: 500;
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#f1f5f9" : "#333"};
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

const SubtitleStyleCard = styled.div`
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "white" : "#333"};
  border-radius: 20px;
  padding: 28px;
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "0 4px 16px rgba(0, 0, 0, 0.04)"
      : "0 4px 16px rgba(255, 255, 255, 0.1)"};
  border: 1px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#e2e8f0" : "#555"};
  grid-column: 1 / -1;
`;

const ProcessingCard = styled.div`
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#fff" : "#000"};
  border-radius: 24px;
  padding: 40px;
  margin-bottom: 32px;
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "0 2px 6px rgba(0, 0, 0, 0.05)"
      : "0 8px 24px rgba(255, 255, 255, 0.25)"};
  border: 1px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#e5e7eb" : "#666"};
  transition: all 0.3s ease;

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
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#1e293b" : "white"};
  margin: 0 0 4px 0;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#64748b" : "#999"};
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
  background: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)"
      : "#333"};
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#e2e8f0" : "transparent"};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background === "#ffffff" ? "white" : "#444"};
    border-color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#cbd5e1" : "transparent"};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) =>
      theme.colors.background === "#ffffff"
        ? "0 8px 24px rgba(0, 0, 0, 0.06)"
        : "0 8px 24px rgba(255, 255, 255, 0.1)"};
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
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "white" : "#222"};
  border-radius: 12px;
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "0 4px 12px rgba(0, 0, 0, 0.06)"
      : "0 4px 12px rgba(255, 255, 255, 0.1)"};
`;

const OptionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;

  svg {
    color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#667eea" : "#a5b4fc"};
  }
`;

const OptionInfo = styled.div`
  flex: 1;
`;

const OptionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#1e293b" : "white"};
  margin-bottom: 4px;
`;

const OptionDesc = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#64748b" : "#999"};
  line-height: 1.4;
`;

const Select = styled.select`
  padding: 12px 18px;
  border: 2px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#e2e8f0" : "#555"};
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#334155" : "white"};
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "white" : "#222"};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#cbd5e1" : "#666"};
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  }

  option {
    background: ${({ theme }) => theme.colors.background === "#ffffff" ? "white" : "#222"};
    color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#334155" : "white"};
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

const CoinIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
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
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#fff" : "#000"};
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "0 2px 6px rgba(0, 0, 0, 0.05)"
      : "0 8px 24px rgba(255, 255, 255, 0.25)"};
  border: 1px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#e5e7eb" : "#666"};
  transition: all 0.3s ease;

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
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#1e293b" : "white"};
  transition: color 0.2s ease;

  &:hover {
    color: #667eea;
  }
`;

const WrenchIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AccordionIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#94a3b8" : "#999"};
  transition: transform 0.3s ease;

  details[open] & {
    transform: rotate(180deg);
  }
`;

const DetailsContent = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#f1f5f9" : "#333"};
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
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#64748b" : "#999"};
  min-width: 130px;
  flex-shrink: 0;
`;

const DetailValue = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#334155" : "white"};
  word-break: break-all;
  font-family: "Monaco", "Courier New", monospace;
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#f8fafc" : "#333"};
  padding: 8px 12px;
  border-radius: 8px;
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#e2e8f0" : "#555"};
`;

const DangerZone = styled.div`
  background: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)"
      : "#000"};
  border: 2px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#fecaca" : "#dc2626"};
  border-radius: 20px;
  padding: 28px;
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "0 4px 16px rgba(220, 38, 38, 0.1)"
      : "0 8px 24px rgba(220, 38, 38, 0.3)"};
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
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "white" : "#1a0000"};
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#fecaca" : "#dc2626"};

  svg {
    color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#dc2626" : "#ff6b6b"};
  }
`;

const DangerTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#991b1b" : "#ff6b6b"};
  margin: 0 0 4px 0;
`;

const DangerDescription = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#b91c1c" : "#ff9999"};
  margin: 0;
  font-weight: 500;
`;

const TrashIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
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
