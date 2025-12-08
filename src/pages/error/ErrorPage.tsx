import styled from "styled-components";
import routePath from "@router/routePath";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ErrorPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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

        <ErrorCode>{t("errorPage.code")}</ErrorCode>
        <ErrorTitle>{t("errorPage.title")}</ErrorTitle>
        <ErrorDescription>
          {t("errorPage.description")}
        </ErrorDescription>

        <ButtonGroup>
          <PrimaryButton onClick={handleGoHome}>{t("errorPage.tryAgain")}</PrimaryButton>
        </ButtonGroup>

        <TechnicalDetails>
          <summary>{t("errorPage.whatToDo")}</summary>
          <DetailContent>
            {t("errorPage.details")}
          </DetailContent>
        </TechnicalDetails>
      </ErrorContainer>
    </ErrorPageWrapper>
  );
}

const ErrorPageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "#000"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ErrorContainer = styled.div`
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#fff" : "#000"};
  border: 1px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "transparent" : "#666"};
  border-radius: 24px;
  padding: 60px 40px;
  max-width: 600px;
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "0 20px 60px rgba(0, 0, 0, 0.3)"
      : "0 8px 24px rgba(255, 255, 255, 0.25)"};
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
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#2d3748" : "white"};
  margin: 0 0 16px 0;
`;

const ErrorDescription = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#718096" : "#ccc"};
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
  background: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "white"};
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "white" : "#000"};
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "0 4px 12px rgba(102, 126, 234, 0.4)"
      : "0 4px 12px rgba(255, 255, 255, 0.3)"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) =>
      theme.colors.background === "#ffffff"
        ? "0 6px 20px rgba(102, 126, 234, 0.6)"
        : "0 6px 20px rgba(255, 255, 255, 0.5)"};
    opacity: ${({ theme }) => theme.colors.background === "#ffffff" ? "1" : "0.9"};
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
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#f7fafc" : "#333"};
  border-radius: 12px;
  padding: 16px;

  summary {
    cursor: pointer;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#4a5568" : "#ccc"};
    user-select: none;

    &:hover {
      color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#667eea" : "white"};
    }
  }
`;

const DetailContent = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#e2e8f0" : "#555"};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#718096" : "#999"};
  font-family: monospace;
  line-height: 1.8;
`;
