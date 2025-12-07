import { css } from "styled-components";

export const globalButtonStyle = css`
  border: none;
  background: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const globalPointButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "linear-gradient(135deg, #000000, #333333)"
      : "linear-gradient(135deg, #ffffff, #e5e5e5)"};
  color: ${({ theme }) =>
    theme.colors.background === "#ffffff" ? "white" : "black"};
  border-radius: 50px;
  padding: 8px 18px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "0 4px 14px rgba(0, 0, 0, 0.15)"
      : "0 4px 14px rgba(255, 255, 255, 0.15)"};

  &:hover {
    background: ${({ theme }) =>
      theme.colors.background === "#ffffff"
        ? "linear-gradient(135deg, #222, #000)"
        : "linear-gradient(135deg, #f5f5f5, #ffffff)"};
    box-shadow: ${({ theme }) =>
      theme.colors.background === "#ffffff"
        ? "0 6px 18px rgba(0, 0, 0, 0.25)"
        : "0 6px 18px rgba(255, 255, 255, 0.25)"};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) =>
      theme.colors.background === "#ffffff"
        ? "0 2px 8px rgba(0, 0, 0, 0.15)"
        : "0 2px 8px rgba(255, 255, 255, 0.15)"};
  }
`;

export const globalPointButtonSecondaryStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.text};
  border-radius: 50px;
  padding: 8px 18px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) =>
      theme.colors.background === "#ffffff"
        ? "rgba(0, 0, 0, 0.08)"
        : "rgba(255, 255, 255, 0.08)"};
  }

  &:active {
    transform: translateY(0);
    background: ${({ theme }) =>
      theme.colors.background === "#ffffff"
        ? "rgba(0, 0, 0, 0.12)"
        : "rgba(255, 255, 255, 0.12)"};
  }
`;
