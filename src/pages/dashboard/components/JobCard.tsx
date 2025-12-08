import styled, { useTheme } from "styled-components";
import { useJobStatus } from "../hooks/useJobStatus";
import { useState } from "react";
import VideoWithRetry from "./VideoWithRetry";
import { formatDate } from "src/utils/timezone";
import { useTranslation } from "react-i18next";
import { DownloadIcon } from "@icons/DownloadIcon";
import { CloseIcon } from "@icons/CloseIcon";
import { ExpandIcon } from "@icons/ExpandIcon";

export default function JobCard({
  job_id,
  job_name,
  onDelete,
}: {
  job_id: string;
  job_name: string;
  onDelete: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data, isLoading, isError } = useJobStatus({ id: job_id });
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <JobCardWrapper>
        <JobCardHeader>
          <JobInfo>
            <JobId>{job_name}...</JobId>
            <StatusBadge $status="loading">
              <StatusDot $status="loading" />
              {t("dashboard.loading")}
            </StatusBadge>
          </JobInfo>
        </JobCardHeader>
      </JobCardWrapper>
    );
  }

  if (isError) {
    return (
      <JobCardWrapper>
        <JobCardHeader>
          <JobInfo>
            <JobId>{job_name}...</JobId>
            <StatusBadge $status="failed">
              <StatusDot $status="failed" />
              {t("dashboard.errorLoading")}
            </StatusBadge>
          </JobInfo>
          <DeleteJobButton onClick={onDelete}>
            <CloseIcon size="20px" color="currentColor" />
          </DeleteJobButton>
        </JobCardHeader>
      </JobCardWrapper>
    );
  }

  if (!data) return null;

  const getStatusType = (status: string) => {
    if (status === "completed") return "completed";
    if (status === "failed") return "failed";
    if (status === "processing") return "processing";
    return "pending";
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!data.result_url) return;

    try {
      const response = await fetch(data.result_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `short_${job_id}_${data.method}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // ExpandIcon 색상 결정 로직 (기존 스타일 유지)
  const expandIconColor = theme?.colors.background === "#ffffff" ? "#94a3b8" : "#999";

  return (
    <JobCardWrapper>
      <JobCardHeader onClick={() => setIsOpen(!isOpen)}>
        <JobInfo>
          <JobId>{job_name}...</JobId>
          <JobMeta>
            <MethodBadge>{data.method}</MethodBadge>
            {data.subtitle && <SubtitleBadge>SUB</SubtitleBadge>}
            {data.vertical && <VerticalBadge>VERT</VerticalBadge>}
            <StatusBadge $status={getStatusType(data.status)}>
              <StatusDot $status={getStatusType(data.status)} />
              {data.status}
            </StatusBadge>
          </JobMeta>
        </JobInfo>
        <JobActions>
          {data.result_url && data.status === "completed" && (
            <DownloadButton onClick={handleDownload} title={t("dashboard.downloadVideo")}>
              <DownloadIcon size="18px" color="currentColor" />
            </DownloadButton>
          )}
          <DeleteJobButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title={t("dashboard.deleteJob")}
          >
            <CloseIcon size="20px" color="currentColor" />
          </DeleteJobButton>
          <ExpandAction $isOpen={isOpen}>
            <ExpandIcon size="24px" color={expandIconColor} />
          </ExpandAction>
        </JobActions>
      </JobCardHeader>

      {isOpen && (
        <JobCardBody>
          {data.result_url && (
            <VideoResult>
              <VideoWithRetry
                file_path={data.result_url}
                retryInterval={30000}
              />
            </VideoResult>
          )}

          <JobDetails>
            {data.error_message && (
              <ErrorMessage>
                <ErrorIcon>⚠️</ErrorIcon>
                {data.error_message}
              </ErrorMessage>
            )}

            <Timeline>
              <TimelineItem>
                <TimelineLabel>{t("dashboard.created")}</TimelineLabel>
                <TimelineValue>{formatDate(data.created_at)}</TimelineValue>
              </TimelineItem>
              {data.started_at && (
                <TimelineItem>
                  <TimelineLabel>{t("dashboard.started")}</TimelineLabel>
                  <TimelineValue>{formatDate(data.started_at)}</TimelineValue>
                </TimelineItem>
              )}
              {data.completed_at && (
                <TimelineItem>
                  <TimelineLabel>{t("dashboard.completed")}</TimelineLabel>
                  <TimelineValue>{formatDate(data.completed_at)}</TimelineValue>
                </TimelineItem>
              )}
            </Timeline>
          </JobDetails>
        </JobCardBody>
      )}
    </JobCardWrapper>
  );
}

const JobCardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "white" : "#000"};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#e2e8f0" : "#666"};
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "0 2px 6px rgba(0, 0, 0, 0.05)"
      : "0 8px 24px rgba(255, 255, 255, 0.25)"};

  &:hover {
    border-color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#cbd5e1" : "#777"};
  }
`;

const JobCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#f8fafc" : "#333"};
  }
`;

const JobInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const JobId = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#475569" : "white"};
  font-family: "Monaco", monospace;
`;

const JobMeta = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

const MethodBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#667eea" : "#a5b4fc"};
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#eef2ff" : "#333"};
  padding: 4px 12px;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SubtitleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #0891b2;
  background: #cffafe;
  padding: 4px 12px;
  border-radius: 8px;
`;

const VerticalBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #c026d3;
  background: #fae8ff;
  padding: 4px 12px;
  border-radius: 8px;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 8px;
  text-transform: capitalize;

  ${({ $status, theme }) => {
    const isDark = theme.colors.background !== "#ffffff";
    switch ($status) {
      case "completed":
        return `
          color: ${isDark ? "#6ee7b7" : "#10b981"};
          background: ${isDark ? "#064e3b" : "#d1fae5"};
        `;
      case "failed":
        return `
          color: ${isDark ? "#fca5a5" : "#ef4444"};
          background: ${isDark ? "#7f1d1d" : "#fee2e2"};
        `;
      case "processing":
        return `
          color: ${isDark ? "#fcd34d" : "#f59e0b"};
          background: ${isDark ? "#78350f" : "#fef3c7"};
        `;
      default:
        return `
          color: ${isDark ? "#a5b4fc" : "#6366f1"};
          background: ${isDark ? "#312e81" : "#e0e7ff"};
        `;
    }
  }}
`;

const StatusDot = styled.span<{ $status: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;

  ${({ $status }) => {
    switch ($status) {
      case "completed":
        return `background: #10b981;`;
      case "failed":
        return `background: #ef4444;`;
      case "processing":
        return `
          background: #f59e0b;
          animation: pulse 2s infinite;
        `;
      default:
        return `background: #6366f1;`;
    }
  }}

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const JobActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DownloadButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const DeleteJobButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#f0f0f0" : "#333"};
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#000000" : "white"};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;

  &:hover {
    background: #fecaca;
    color: #ff0000;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// 기존 ExpandIcon을 ExpandAction으로 변경 (아이콘 래퍼 역할)
const ExpandAction = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
  cursor: pointer;
`;

const JobCardBody = styled.div`
  padding: 0 24px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#f1f5f9" : "#555"};
`;

const VideoResult = styled.div`
  margin: 20px 0;
`;

const JobDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#fef2f2" : "#7f1d1d"};
  border: 1px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#fecaca" : "#dc2626"};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#991b1b" : "#fca5a5"};
  font-size: 14px;
  line-height: 1.5;
`;

const ErrorIcon = styled.span`
  font-size: 20px;
  flex-shrink: 0;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#f8fafc" : "#333"};
  border-radius: 12px;
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimelineLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#64748b" : "#999"};
`;

const TimelineValue = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#334155" : "white"};
  font-family: "Monaco", monospace;
`;