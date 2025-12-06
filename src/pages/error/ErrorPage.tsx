import styled from "styled-components";
import routePath from "@router/routePath";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate(routePath.HOME);
  };

  return (
    <ErrorPageWrapper>
      <ErrorContainer>
        <IconWrapper>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </IconWrapper>

        <ErrorCode>502</ErrorCode>
        <ErrorTitle>Bad Gateway</ErrorTitle>
        <ErrorDescription>
          Our server is taking a quick break. Don't worry, they'll be back
          analyzing your content in just a moment!
        </ErrorDescription>

        <ButtonGroup>
          <PrimaryButton onClick={handleGoHome}>Try Again</PrimaryButton>
        </ButtonGroup>

        <TechnicalDetails>
          <summary>What should I do?</summary>
          <DetailContent>
            Please refresh the page or try again in a few moments.
          </DetailContent>
        </TechnicalDetails>
      </ErrorContainer>
    </ErrorPageWrapper>
  );
}

const ErrorPageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ErrorContainer = styled.div`
  background: white;
  border-radius: 24px;
  padding: 60px 40px;
  max-width: 600px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 20px 0;
  line-height: 1;
`;

const ErrorTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 16px 0;
`;

const ErrorDescription = styled.p`
  font-size: 18px;
  color: #718096;
  line-height: 1.6;
  margin: 0 0 40px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 24px;

  svg {
    width: 80px;
    height: 80px;
    stroke: #667eea;
  }
`;

const TechnicalDetails = styled.details`
  margin-top: 32px;
  text-align: left;
  background: #f7fafc;
  border-radius: 12px;
  padding: 16px;

  summary {
    cursor: pointer;
    font-weight: 600;
    color: #4a5568;
    user-select: none;

    &:hover {
      color: #667eea;
    }
  }
`;

const DetailContent = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
  font-size: 14px;
  color: #718096;
  font-family: monospace;
  line-height: 1.8;
`;
