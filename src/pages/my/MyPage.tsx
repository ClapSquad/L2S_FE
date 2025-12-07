import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import styled from "styled-components";
import NavigationBar from "@components/NavigationBar";
import { useWithdraw } from "./hooks/useWithdraw";
import { PersonIcon } from "src/icons/PersonIcon";
import { MailIcon } from "src/icons/MailIcon";
import { PersonOffIcon } from "src/icons/PersonOffIcon";
import routePath from "@router/routePath";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const { user } = useContext(AuthContext);
  const { mutate } = useWithdraw();
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      <MyPageWrapper>
        <ContentContainer>
          <Header>
            <Title>My Information</Title>
            <Subtitle>Check and manage your account information</Subtitle>
          </Header>

          <ProfileCard>
            <ProfileIcon>
              <PersonIcon size="50px" color="white" />
            </ProfileIcon>

            <InfoSection>
              <InfoItem>
                <IconWrapper>
                  <MailIcon size="24px" color="white" />
                </IconWrapper>
                <InfoContent>
                  <Label>Email</Label>
                  <Value>{user!.email}</Value>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>Aa</IconWrapper>
                <InfoContent>
                  <Label>Username</Label>
                  <Value>{user!.username}</Value>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>C</IconWrapper>
                <InfoContent>
                  <Label>Credits</Label>
                  <Value>{user!.credit} credits left</Value>
                </InfoContent>
              </InfoItem>

              <GetCreditButton onClick={() => navigate(routePath.CREDIT)}>
                Get more credits
              </GetCreditButton>
            </InfoSection>
          </ProfileCard>

          <DangerZone>
            <DangerTitle>Manage account</DangerTitle>
            <WithdrawButton
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure? Note that this action is irreversible"
                  )
                ) {
                  mutate();
                }
              }}
            >
              <PersonOffIcon size="24px" color="red" />
              Delete my account
            </WithdrawButton>
          </DangerZone>
        </ContentContainer>
      </MyPageWrapper>
    </>
  );
}

const MyPageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)"
      : "#000000"};
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ContentContainer = styled.div`
  max-width: 600px;
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#64748b" : "white"};
  font-size: 16px;
  font-weight: 400;
`;

const ProfileCard = styled.div`
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#fff" : "#000"};
  border: 1px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#e5e7eb" : "#666"};
  border-radius: 24px;
  padding: 40px;
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "0 2px 6px rgba(0, 0, 0, 0.05)"
      : "0 8px 24px rgba(255, 255, 255, 0.25)"};
  margin-bottom: 24px;
`;

const ProfileIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
  color: white;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#f8fafc" : "#333"};
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#f1f5f9" : "#555"};
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const Label = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#64748b" : "#ccc"};
  font-weight: 500;
`;

const Value = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#1e293b" : "white"};
  font-weight: 600;
`;

const DangerZone = styled.div`
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#fff" : "#000"};
  border: 1px solid ${({ theme }) => theme.colors.background === "#ffffff" ? "#e5e7eb" : "#666"};
  border-radius: 24px;
  padding: 32px 40px;
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "0 2px 6px rgba(0, 0, 0, 0.05)"
      : "0 8px 24px rgba(255, 255, 255, 0.25)"};
`;

const DangerTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#1e293b" : "white"};
  margin-bottom: 16px;
`;

const WithdrawButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "white" : "#000"};
  color: #ef4444;
  border: 2px solid #fee2e2;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #fef2f2;
    border-color: #fecaca;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const GetCreditButton = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  color: white;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
