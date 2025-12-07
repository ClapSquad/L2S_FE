import { CloseIcon } from "src/icons/CloseIcon";
import styled from "styled-components";
import { globalButtonStyle } from "@styles/globalStyle";
import { ToggleButton } from "./Toggle";
import { useTheme } from "src/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function SettingModal({ onClose }: { onClose: () => void }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <ModalWrapper>
      <TopBar>
        <Title>{t("settings.title")}</Title>
        <Button onClick={onClose}>
          <CloseIcon size="30" color={isDarkMode ? "white" : "black"} />
        </Button>
      </TopBar>
      <hr />
      <VerticalLayout>
        <HorizontalLayout>
          <label htmlFor="language-select">{t("settings.language")}</label>
          <select
            id="language-select"
            value={i18n.language}
            onChange={handleLanguageChange}
          >
            <option value="en">{t("settings.english")}</option>
            <option value="ko">{t("settings.korean")}</option>
          </select>
        </HorizontalLayout>
        <HorizontalLayout>
          <label htmlFor="dark-mode-toggle">{t("settings.darkMode")}</label>
          <ToggleButton isOn={isDarkMode} setIsOn={toggleTheme} />
        </HorizontalLayout>
      </VerticalLayout>
    </ModalWrapper>
  );
}

const Title = styled.div`
  font-weight: bold;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  ${globalButtonStyle}
`;

const VerticalLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HorizontalLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.modalBackground};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  padding: 20px;

  width: 300px;

  hr {
    border-color: ${({ theme }) => theme.colors.border};
  }

  select {
    background-color: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    padding: 4px 8px;
    border-radius: 4px;
  }
`;
