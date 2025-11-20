import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useFetchVideoDetail } from "../hooks/useFetchVideoDetail";
import { useDeleteMyVideo } from "../hooks/useDeleteMyVideo";
import { API } from "@apis/endpoints";
import { BarLoader } from "react-spinners";
import { ToggleButton } from "@components/Toggle";

export default function VideoPage() {
  const id = useParams().id!;
  const { data } = useFetchVideoDetail({ id });
  const { mutate } = useDeleteMyVideo();

  const [loading, setLoading] = useState(true);

  return (
    <DashBoardPageWrapper>
      <ContentContainer>
        <HeaderSection>
          <Title>Video Review</Title>
          <DownloadLink
            href={`${import.meta.env.VITE_BACKEND_API_URL}${
              API.VIDEO.DOWNLOAD
            }?video_id=${id}`}
            download
          >
            Download Original
          </DownloadLink>
        </HeaderSection>

        <VideoSection>
          {loading && (
            <LoadingContainer>
              <LoadingText>Loading video...</LoadingText>
              <BarLoader color="#9333ea" width="100%" />
            </LoadingContainer>
          )}
          {data?.file_path && (
            <StyledVideo
              src={
                data.file_path.startsWith("http")
                  ? data.file_path
                  : `${import.meta.env.VITE_BACKEND_API_URL}${data.file_path}`
              }
              controls
              onLoadedData={() => setLoading(false)}
              style={{ display: loading ? "none" : "block" }}
            />
          )}
        </VideoSection>

        <OptionsSection>
          <OptionCard>
            <OptionLabel>Method</OptionLabel>
            <StyledSelect>
              <option value="llm">LLM: faster, verbal videos only</option>
              <option value="echofusion">
                EchoFusion: slower, deep-search
              </option>
            </StyledSelect>
          </OptionCard>

          <OptionCard>
            <OptionLabel>Subtitles</OptionLabel>
            <ToggleButton />
          </OptionCard>

          <OptionCard>
            <OptionLabel>9:16 ratio conversion</OptionLabel>
            <ToggleButton />
          </OptionCard>

          <GenerateButton onClick={() => console.log("Request generate")}>
            Generate shorts
          </GenerateButton>
        </OptionsSection>

        <DetailsSection>
          <summary>Review Detail</summary>
          <DetailContent>
            <DetailItem>
              <DetailLabel>Video ID:</DetailLabel>
              <DetailValue>{data?.id}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Uploader user ID:</DetailLabel>
              <DetailValue>{data?.user_id}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Youtube ID:</DetailLabel>
              <DetailValue>{data?.youtube_id}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Static file path:</DetailLabel>
              <DetailValue>{data?.file_path}</DetailValue>
            </DetailItem>
          </DetailContent>
        </DetailsSection>

        <DeleteButton onClick={() => mutate(id)}>Delete Video</DeleteButton>
      </ContentContainer>
    </DashBoardPageWrapper>
  );
}

const DashBoardPageWrapper = styled.div`
  background: #ffffff;
  height: calc(100vh - 150px);
  padding: 40px 20px;
  overflow-y: auto;
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
`;

const DownloadLink = styled.a`
  color: #9333ea;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border: 2px solid #9333ea;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #9333ea;
    color: white;
  }
`;

const VideoSection = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
`;

const LoadingText = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin: 0;
`;

const StyledVideo = styled.video`
  width: 100%;
  max-height: 500px;
  border-radius: 8px;
  background: #000;
`;

const OptionsSection = styled.div`
  display: grid;
  gap: 20px;
  margin-bottom: 32px;
`;

const OptionCard = styled.div`
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #d1d5db;
  }
`;

const OptionLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #374151;
`;

const StyledSelect = styled.select`
  padding: 8px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #9333ea;
  }

  &:focus {
    outline: none;
    border-color: #9333ea;
  }
`;

const DetailsSection = styled.details`
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 32px;

  summary {
    font-size: 16px;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: #9333ea;
    }
  }
`;

const DetailContent = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
`;

const DetailItem = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  min-width: 140px;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #1f2937;
  word-break: break-all;
`;

const DeleteButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #dc2626;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const GenerateButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #6366f1 20%, #ec4899 80%);
  }

  &:active {
    transform: translateY(1px);
  }
`;
