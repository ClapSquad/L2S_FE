import styled from "styled-components";

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 75%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  button[type="submit"] {
    margin-top: 8px;
    padding: 10px 0;
    font-size: 1rem;
    font-weight: 600;
    background: #111;
    color: white;
    border: none;
    border-radius: 8px;
    transition: all 0.25s ease;
    cursor: pointer;

    &:hover {
      background: #000;
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
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
    color: #111;
    margin-bottom: 12px;
  }

  a {
    margin-top: 12px;
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.25s ease;

    &:hover {
      color: #000;
      text-decoration: underline;
    }
  }
`;

export const PageFiller = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
