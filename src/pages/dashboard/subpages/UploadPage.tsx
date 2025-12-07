import styled from "styled-components";
import VideoInput from "@components/VideoInput";

export default function UploadPage() {
  return (
    <UploadPageWrapper>
      <VideoInput />
    </UploadPageWrapper>
  );
}
const UploadPageWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)"
      : "#000"};
`;
