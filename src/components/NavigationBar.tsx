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
import { useNavigateBack } from "@hooks/userNavigateBack";
import { ArrowBackIcon } from "src/icons/ArrowBackIcon";
import titleimage from "@main/assets/Long2ShortTextHorizontal.png";

export default function NavigationBar() {
  const navigateBack = useNavigateBack();
  const navigate = useNavigate();
  const { isOpen, open, close } = useModal();
  const isLoggedIn = useIsLoggedIn();
  const { mutate } = useLogout();
  const location = useLocation();
  const isMyPage = location.pathname === routePath.MY;
  const isAuthPage =
    location.pathname === routePath.LOGIN ||
    location.pathname === routePath.REGISTER;
  const isHomePage = location.pathname === routePath.HOME;
  const isDashboardPage = location.pathname === routePath.DASHBOARD;

  return (
    <>
      <Modal isOpen={isOpen} onClose={close}>
        <SettingModal onClose={close} />
      </Modal>
      <NavigationBarWrapper>
        {isHomePage ? (
          <Button onClick={() => navigate(routePath.HOME)}>
            <TitleImage src={titleimage} alt="Title image" size="250px" />
          </Button>
        ) : (
          <Button onClick={() => navigateBack()}>
            <ArrowBackIcon size="30" color="black" />
          </Button>
        )}

        <ButtonSet>
          {isLoggedIn ? (
            <>
              <PointButton onClick={() => mutate()}>
                <LogoutIcon size="30" color="white" />
                Sign out
              </PointButton>
              {!isDashboardPage && (
                <SecondaryButton onClick={() => navigate(routePath.DASHBOARD)}>
                  Dashboard
                </SecondaryButton>
              )}
              {!isMyPage && (
                <Button onClick={() => navigate(routePath.MY)}>
                  <AccountCircleIcon size="30" color="black" />
                </Button>
              )}
            </>
          ) : (
            !isAuthPage && (
              <PointButton onClick={() => navigate(routePath.LOGIN)}>
                <LoginIcon size="30" color="white" />
                Sign in
              </PointButton>
            )
          )}
          <Button onClick={open}>
            <SettingsIcon size="30" color="black" />
          </Button>
        </ButtonSet>
      </NavigationBarWrapper>
    </>
  );
}

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

  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;
