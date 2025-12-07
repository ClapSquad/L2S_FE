import type { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  ErrorMessage,
  InputWrapper,
  StyledInput,
} from "@auth/styles/inputFieldStyle";
import { useTranslation } from "react-i18next";

interface UserNameInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function UsernameInput({
  register,
  errors,
}: UserNameInputProps) {
  const { t } = useTranslation();

  return (
    <InputWrapper>
      <StyledInput
        {...register("username", {
          required: t("auth.putYourUsername"),
          minLength: {
            value: 2,
            message: t("auth.usernameTooShort"),
          },
          validate: (value) =>
            value.trim() !== "" || t("auth.usernameCannotBeEmpty"),
        })}
        placeholder={t("auth.username")}
        type="text"
      />
      {errors.username && (
        <ErrorMessage style={{ color: "red" }}>
          {errors.username.message?.toString()}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
}
