import routePath from "@router/routePath";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginIcon } from "src/icons/LoginIcon";
import { globalButtonStyle } from "@styles/globalStyle";
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
              <Button onClick={() => mutate()}>
                <LogoutIcon size="30" color="black" />
              </Button>
              {!isMyPage && (
                <Button onClick={() => navigate(routePath.MY)}>
                  <AccountCircleIcon size="30" color="black" />
                </Button>
              )}
            </>
          ) : (
            !isAuthPage && (
              <LoginButton onClick={() => navigate(routePath.LOGIN)}>
                <LoginIcon size="30" color="white" />
                Sign in
              </LoginButton>
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

const LoginButton = styled.button`
  ${globalButtonStyle}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background: linear-gradient(135deg, #000000, #333333);
  color: white;
  border-radius: 50px;
  padding: 8px 18px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);

  &:hover {
    background: linear-gradient(135deg, #222, #000);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
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
