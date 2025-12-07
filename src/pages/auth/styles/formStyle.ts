import styled from "styled-components";

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 75%;
  max-width: 400px;
  background: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "rgba(255, 255, 255, 0.8)"
      : "rgba(31, 41, 55, 0.8)"};
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? `0 10px 25px ${theme.colors.cardShadow}`
      : "0 12px 48px rgba(255, 255, 255, 0.15), 12px 0 48px rgba(255, 255, 255, 0.15), -12px 0 48px rgba(255, 255, 255, 0.15)"};

  button[type="submit"] {
    margin-top: 8px;
    padding: 10px 0;
    font-size: 1rem;
    font-weight: 600;
    background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#111" : "white"};
    color: ${({ theme }) => theme.colors.background === "#ffffff" ? "white" : "#000"};
    border: none;
    border-radius: 8px;
    transition: all 0.25s ease;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#000" : "#f0f0f0"};
      transform: translateY(-2px);
      box-shadow: ${({ theme }) =>
        theme.colors.background === "#ffffff"
          ? "0 6px 14px rgba(0, 0, 0, 0.2)"
          : "0 6px 14px rgba(255, 255, 255, 0.3)"};
    }

    &:active {
      transform: translateY(0);
      box-shadow: ${({ theme }) =>
        theme.colors.background === "#ffffff"
          ? "0 2px 6px rgba(0, 0, 0, 0.15)"
          : "0 2px 6px rgba(255, 255, 255, 0.2)"};
    }
  }
`;

export const PageWrapper = styled.div`
  flex-grow: 0.9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  text-align: center;

  h2 {
    font-size: 2rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 12px;
  }

  a {
    margin-top: 12px;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.25s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.text};
      text-decoration: underline;
    }
  }
`;

export const PageFiller = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
