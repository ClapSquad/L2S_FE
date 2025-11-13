import type { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  ErrorMessage,
  InputWrapper,
  StyledInput,
} from "@auth/styles/inputFieldStyle";

interface UserNameInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function UsernameInput({
  register,
  errors,
}: UserNameInputProps) {
  return (
    <InputWrapper>
      <StyledInput
        {...register("username", {
          required: "Put your username.",
          minLength: {
            value: 2,
            message: "Username must be longer than 2 characters",
          },
          validate: (value) =>
            value.trim() !== "" || "User name cannot be empty.",
        })}
        placeholder="Username"
        type="text"
      />
      {errors.email && (
        <ErrorMessage style={{ color: "red" }}>
          {errors.email.message?.toString()}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
}
