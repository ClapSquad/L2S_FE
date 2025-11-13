import type { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  ErrorMessage,
  InputWrapper,
  StyledInput,
} from "@auth/styles/inputFieldStyle";

interface EmailInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function EmailInput({ register, errors }: EmailInputProps) {
  const hasError = Boolean(errors.email);

  return (
    <InputWrapper>
      <StyledInput
        {...register("email", {
          required: "Put your email address",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Not a valid email format",
          },
        })}
        placeholder="Email"
        type="email"
        $hasError={hasError}
      />
      {hasError && (
        <ErrorMessage>{errors.email?.message?.toString()}</ErrorMessage>
      )}
    </InputWrapper>
  );
}
