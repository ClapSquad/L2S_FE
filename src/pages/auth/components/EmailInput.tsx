import type { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  ErrorMessage,
  InputWrapper,
  StyledInput,
} from "@auth/styles/inputFieldStyle";
import { useTranslation } from "react-i18next";

interface EmailInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function EmailInput({ register, errors }: EmailInputProps) {
  const hasError = Boolean(errors.email);
  const { t } = useTranslation();

  return (
    <InputWrapper>
      <StyledInput
        {...register("email", {
          required: t("auth.putYourEmail"),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: t("auth.notValidEmail"),
          },
        })}
        placeholder={t("auth.email")}
        type="email"
        $hasError={hasError}
      />
      {hasError && (
        <ErrorMessage>{errors.email?.message?.toString()}</ErrorMessage>
      )}
    </InputWrapper>
  );
}
