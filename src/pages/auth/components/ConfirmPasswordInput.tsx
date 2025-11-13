import type { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  ErrorMessage,
  InputWrapper,
  StyledInput,
} from "@auth/styles/inputFieldStyle";

interface ConfirmPasswordInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  password: string;
}

export default function ConfirmPasswordInput({
  register,
  errors,
  password,
}: ConfirmPasswordInputProps) {
  return (
    <InputWrapper>
      <StyledInput
        {...register("confirmPassword", {
          required: "Fill in the confirm password field",
          validate: (value) => value === password || "Password do not match.",
        })}
        placeholder="Password confirm"
        type="password"
      />
      {errors.confirmPassword && (
        <ErrorMessage style={{ color: "red" }}>
          {errors.confirmPassword.message?.toString()}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
}
