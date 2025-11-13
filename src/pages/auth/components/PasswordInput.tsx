import type { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  ErrorMessage,
  InputWrapper,
  StyledInput,
} from "@auth/styles/inputFieldStyle";

interface PasswordInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function PasswordInput({
  register,
  errors,
}: PasswordInputProps) {
  return (
    <InputWrapper>
      <StyledInput
        {...register("password", {
          required: "Put your password",
          minLength: {
            value: 6,
            message: "Password must be longer than 6 characters",
          },
        })}
        placeholder="Password"
        type="password"
      />
      {errors.password && (
        <ErrorMessage style={{ color: "red" }}>
          {errors.password.message?.toString()}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
}
