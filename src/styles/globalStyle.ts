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

export const globalPointButtonSecondaryStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background: transparent;
  color: #000;
  border: 2px solid #000;
  border-radius: 50px;
  padding: 8px 18px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(0);
    background: rgba(0, 0, 0, 0.12);
  }
`;
