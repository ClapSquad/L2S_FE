import routePath from "@router/routePath";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginIcon } from "src/icons/LoginIcon";
import {
  globalButtonStyle,
  globalPointButtonSecondaryStyle,
  globalPointButtonStyle,
} from "@styles/globalStyle";
import { SettingsIcon } from "src/icons/SettingsIcon";
import { useModal } from "@hooks/useModal";
import { Modal } from "@components/Modal";
import SettingModal from "@components/SettingModal";
import { useIsLoggedIn } from "@hooks/useIsLoggedIn";
import { LogoutIcon } from "src/icons/LogoutIcon";
import { AccountCircleIcon } from "src/icons/AccountCircleIcon";
import { useLogout } from "@apis/hooks/useLogout";
import titleimage from "@main/assets/Long2ShortTextHorizontal.png";
import { useMe } from "@apis/hooks/useMe";
import { useTheme } from "src/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function NavigationBar() {
  const navigate = useNavigate();
  const { isOpen, open, close } = useModal();
  const isLoggedIn = useIsLoggedIn();
  const { mutate } = useLogout();
  const location = useLocation();
  const isMyPage = location.pathname === routePath.MY;
  const isAuthPage =
    location.pathname === routePath.LOGIN ||
    location.pathname === routePath.REGISTER;
  const isDashboardPage = location.pathname === routePath.DASHBOARD;
  const { data } = useMe();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={isOpen} onClose={close}>
        <SettingModal onClose={close} />
      </Modal>
      <NavigationBarWrapper>
        {/* {isHomePage ? (
          <Button onClick={() => navigate(routePath.HOME)}>
            <TitleImage src={titleimage} alt="Title image" size="250px" />
          </Button>
        ) : (
          <Button onClick={() => navigateBack()}>
            <ArrowBackIcon size="30" color={isDarkMode ? "white" : "black"} />
          </Button>
        )} */}

        <Button onClick={() => navigate(routePath.HOME)}>
          <TitleImage src={titleimage} alt="Title image" size="250px" />
        </Button>

        <ButtonSet>
          {isLoggedIn ? (
            <>
              <UserInfoWrapper>
                <Username>{data?.user.username}</Username>
                <CreditBadge>{data?.user.credit}🪙</CreditBadge>
              </UserInfoWrapper>
              <PointButton onClick={() => mutate()}>
                <LogoutIcon size="30" color={isDarkMode ? "black" : "white"} />
                {t("nav.signOut")}
              </PointButton>
              {!isDashboardPage && (
                <SecondaryButton onClick={() => navigate(routePath.DASHBOARD)}>
                  {t("nav.dashboard")}
                </SecondaryButton>
              )}
              {!isMyPage && (
                <Button onClick={() => navigate(routePath.MY)}>
                  <AccountCircleIcon
                    size="30"
                    color={isDarkMode ? "white" : "black"}
                  />
                </Button>
              )}
            </>
          ) : (
            !isAuthPage && (
              <PointButton onClick={() => navigate(routePath.LOGIN)}>
                <LoginIcon size="30" color={isDarkMode ? "black" : "white"} />
                {t("nav.signIn")}
              </PointButton>
            )
          )}
          <Button onClick={open}>
            <SettingsIcon size="30" color={isDarkMode ? "white" : "black"} />
          </Button>
        </ButtonSet>
      </NavigationBarWrapper>
    </>
  );
}

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "rgba(0, 0, 0, 0.05)"
      : "rgba(255, 255, 255, 0.1)"};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`;

const Username = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const CreditBadge = styled.span`
  background: #6e6e6e;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PointButton = styled.button`
  ${globalButtonStyle}
  ${globalPointButtonStyle}
`;

const SecondaryButton = styled.button`
  ${globalButtonStyle}
  ${globalPointButtonSecondaryStyle}
`;

const TitleImage = styled.img<{ size: string }>`
  width: ${({ size }) => size};
`;

const Button = styled.button`
  ${globalButtonStyle}
`;

const ButtonSet = styled.div`
  display: flex;
  gap: 8px;
`;

const NavigationBarWrapper = styled.nav`
  z-index: 1;
  position: sticky;
  top: 0;

  display: flex;

  justify-content: space-between;
  align-items: center;

  padding: 8px;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.navBackground};
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? `0 2px 8px ${theme.colors.navShadow}`
      : "0 8px 24px rgba(255, 255, 255, 0.25)"};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
`;
