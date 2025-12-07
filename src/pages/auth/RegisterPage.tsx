import { useForm } from "react-hook-form";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import ConfirmPasswordInput from "./components/ConfirmPasswordInput";
import { useRegister } from "@auth/hooks/useRegister";
import UsernameInput from "./components/UsernameInput";
import NavigationBar from "@components/NavigationBar";
import { FormStyle, PageFiller, PageWrapper } from "./styles/formStyle";
import Logo from "@components/Logo";
import { useTranslation } from "react-i18next";

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const password = watch("password");

  const { mutate } = useRegister();
  const onSubmit = (data: RegisterFormData) => {
    mutate({
      email: data.email,
      username: data.username,
      password: data.password,
    });
  };

  const { t } = useTranslation();

  return (
    <PageFiller>
      <NavigationBar />
      <PageWrapper>
        <h2>{t("auth.signUp")}</h2>
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Logo size="100px" />
          </div>
          <EmailInput register={register} errors={errors} />
          <UsernameInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <ConfirmPasswordInput
            register={register}
            errors={errors}
            password={password}
          />
          <button type="submit">{t("auth.signUp")}</button>
        </FormStyle>
      </PageWrapper>
    </PageFiller>
  );
}
