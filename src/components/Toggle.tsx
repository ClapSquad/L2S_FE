import { useState } from "react";
import styled from "styled-components";

interface ToggleButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function ToggleButton({ checked, onChange }: ToggleButtonProps = {}) {
  const [internalIsOn, setInternalIsOn] = useState(false);

  const isControlled = checked !== undefined && onChange !== undefined;
  const isOn = isControlled ? checked : internalIsOn;

  const handleToggle = () => {
    if (isControlled) {
      onChange(!checked);
    } else {
      setInternalIsOn(!internalIsOn);
    }
  };

  return <Switch $isOn={isOn} onClick={handleToggle} />;
}

const Switch = styled.button<{ $isOn: boolean }>`
  width: 60px;
  height: 30px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: ${({ $isOn }) => ($isOn ? "green" : "gray")};
  position: relative;
  transition: background-color 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${({ $isOn }) => ($isOn ? "32px" : "3px")};
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    transition: left 0.3s;
  }
`;
