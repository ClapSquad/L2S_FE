import styled from "styled-components";
import { useJobStatus } from "../hooks/useJobStatus";
import { useState } from "react";
import VideoWithRetry from "./VideoWithRetry";

export default function JobCard({
  job_id,
  onDelete,
}: {
  job_id: string;
  onDelete: () => void;
}) {
  const { data, isLoading, isError } = useJobStatus({ id: job_id });
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <JobCardWrapper>
        <JobCardHeader>
          <JobInfo>
            <JobId>Job {job_id}...</JobId>
            <StatusBadge $status="loading">
              <StatusDot $status="loading" />
              Loading...
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
            <JobId>Job {job_id}...</JobId>
            <StatusBadge $status="failed">
              <StatusDot $status="failed" />
              Error loading job
            </StatusBadge>
          </JobInfo>
          <DeleteJobButton onClick={onDelete}>
            <span>✕</span>
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

  return (
    <JobCardWrapper>
      <JobCardHeader onClick={() => setIsOpen(!isOpen)}>
        <JobInfo>
          <JobId>Job {job_id}...</JobId>
          <JobMeta>
            <MethodBadge>{data.method}</MethodBadge>
            <StatusBadge $status={getStatusType(data.status)}>
              <StatusDot $status={getStatusType(data.status)} />
              {data.status}
            </StatusBadge>
          </JobMeta>
        </JobInfo>
        <JobActions>
          {data.result_url && data.status === "completed" && (
            <DownloadButton onClick={handleDownload} title="Download video">
              <DownloadIcon>↓</DownloadIcon>
            </DownloadButton>
          )}
          <DeleteJobButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Delete job"
          >
            <span>✕</span>
          </DeleteJobButton>
          <ExpandIcon $isOpen={isOpen}>▼</ExpandIcon>
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
                <TimelineLabel>Created</TimelineLabel>
                <TimelineValue>
                  {new Date(data.created_at).toLocaleString()}
                </TimelineValue>
              </TimelineItem>
              {data.started_at && (
                <TimelineItem>
                  <TimelineLabel>Started</TimelineLabel>
                  <TimelineValue>
                    {new Date(data.started_at).toLocaleString()}
                  </TimelineValue>
                </TimelineItem>
              )}
              {data.completed_at && (
                <TimelineItem>
                  <TimelineLabel>Completed</TimelineLabel>
                  <TimelineValue>
                    {new Date(data.completed_at).toLocaleString()}
                  </TimelineValue>
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
  background: white;
  border-radius: 20px;
  border: 2px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
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
    background: #f8fafc;
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
  color: #475569;
  font-family: "Monaco", monospace;
`;

const JobMeta = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const MethodBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
  background: #eef2ff;
  padding: 4px 12px;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

  ${({ $status }) => {
    switch ($status) {
      case "completed":
        return `
          color: #10b981;
          background: #d1fae5;
        `;
      case "failed":
        return `
          color: #ef4444;
          background: #fee2e2;
        `;
      case "processing":
        return `
          color: #f59e0b;
          background: #fef3c7;
        `;
      default:
        return `
          color: #6366f1;
          background: #e0e7ff;
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

const DownloadIcon = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const DeleteJobButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  color: #000000;
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

const ExpandIcon = styled.span<{ $isOpen: boolean }>`
  font-size: 12px;
  color: #94a3b8;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

const JobCardBody = styled.div`
  padding: 0 24px 24px;
  border-top: 1px solid #f1f5f9;
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
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #991b1b;
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
  background: #f8fafc;
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
  color: #64748b;
`;

const TimelineValue = styled.span`
  font-size: 13px;
  color: #334155;
  font-family: "Monaco", monospace;
`;
