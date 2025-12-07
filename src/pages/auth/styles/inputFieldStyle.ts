import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 14px;
  font-size: 0.95rem;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1.5px solid
    ${({ $hasError, theme }) =>
      $hasError
        ? "#e74c3c"
        : theme.colors.background === "#ffffff"
        ? theme.colors.inputBorder
        : "#555"};
  background-color: ${({ $hasError, theme }) =>
    $hasError
      ? "rgba(255, 230, 230, 0.2)"
      : theme.colors.background === "#ffffff"
      ? theme.colors.inputBackground
      : "#333"};
  color: ${({ theme }) =>
    theme.colors.background === "#ffffff" ? theme.colors.text : "white"};
  outline: none;
  transition: all 0.25s ease;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? "#e74c3c" : "#111")};
    box-shadow: ${({ $hasError }) =>
      $hasError
        ? "0 0 0 3px rgba(231,76,60,0.15)"
        : "0 0 0 3px rgba(0,0,0,0.08)"};
  }

  &::placeholder {
    color: ${({ theme }) =>
      theme.colors.background === "#ffffff"
        ? theme.colors.inputPlaceholder
        : "#999"};
  }
`;

export const ErrorMessage = styled.p`
  font-size: 0.85rem;
  color: #e74c3c;
  margin: 0;
  padding-left: 2px;
`;
