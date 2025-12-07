import { CloseIcon } from "src/icons/CloseIcon";
import styled from "styled-components";
import { globalButtonStyle } from "@styles/globalStyle";
import { ToggleButton } from "./Toggle";
import { useTheme } from "src/contexts/ThemeContext";

export default function SettingModal({ onClose }: { onClose: () => void }) {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <ModalWrapper>
      <TopBar>
        <Title>Setting</Title>
        <Button onClick={onClose}>
          <CloseIcon size="30" color={isDarkMode ? "white" : "black"} />
        </Button>
      </TopBar>
      <hr />
      <VerticalLayout>
        <HorizontalLayout>
          <label htmlFor="language-select">언어 선택</label>
          <select>
            <option value="">English</option>
            <option value="">한국어</option>
          </select>
        </HorizontalLayout>
        <HorizontalLayout>
          <label htmlFor="language-select">다크 모드</label>
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
