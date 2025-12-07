import type { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  ErrorMessage,
  InputWrapper,
  StyledInput,
} from "@auth/styles/inputFieldStyle";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <InputWrapper>
      <StyledInput
        {...register("confirmPassword", {
          required: t("auth.fillConfirmPassword"),
          validate: (value) => value === password || t("auth.passwordsDoNotMatch"),
        })}
        placeholder={t("auth.passwordConfirm")}
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
