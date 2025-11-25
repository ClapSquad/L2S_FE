import { toast } from "react-toastify";
import styled from "styled-components";

export const showCreditConfirmToast = ({
  message,
  onYes,
  onNo,
}: {
  message: string;
  onYes?: () => void;
  onNo?: () => void;
}) => {
  toast(
    ({ closeToast }) => (
      <ToastContainer>
        <ToastMessage>{message}</ToastMessage>
        <ButtonGroup>
          <Button
            variant="secondary"
            onClick={() => {
              onNo && onNo();
              closeToast();
            }}
          >
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onYes && onYes();
              closeToast();
            }}
          >
            Yes
          </Button>
        </ButtonGroup>
      </ToastContainer>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    }
  );
};

const ToastContainer = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
`;

const ToastMessage = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1.5;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant }) =>
    variant === "primary"
      ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  `
      : `
    background: #f5f5f5;
    color: #666;
    
    &:hover {
      background: #e8e8e8;
    }
  `}

  &:active {
    transform: translateY(0);
  }
`;
