import { useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  ErrorMessage,
  InputWrapper,
  StyledInput,
} from "@auth/styles/inputFieldStyle";
import { VisibilityIcon } from "src/icons/VisibilityIcon";
import { VisibilityOffIcon } from "src/icons/VisibilityOffIcon";

interface PasswordInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function PasswordInput({
  register,
  errors,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <InputWrapper style={{ position: "relative" }}>
      <StyledInput
        {...register("password", {
          required: "Put your password",
          minLength: {
            value: 6,
            message: "Password must be longer than 6 characters",
          },
        })}
        placeholder="Password"
        type={visible ? "text" : "password"}
      />

      {/* 👁 Eye Toggle Button */}
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#9ca3af",
          fontSize: "14px",
        }}
      >
        {!visible ? (
          <VisibilityIcon size="24px" color="gray" />
        ) : (
          <VisibilityOffIcon size="24px" color="gray" />
        )}
      </button>

      {errors.password && (
        <ErrorMessage style={{ color: "red" }}>
          {errors.password.message?.toString()}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
}
