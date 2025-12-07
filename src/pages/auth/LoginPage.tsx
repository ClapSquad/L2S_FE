import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import routePath from "@router/routePath";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import { useLogin } from "@auth/hooks/useLogin";
import NavigationBar from "@components/NavigationBar";
import Logo from "@components/Logo";
import { FormStyle, PageFiller, PageWrapper } from "./styles/formStyle";
import { useTranslation } from "react-i18next";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { mutate } = useLogin();
  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  const { t } = useTranslation();

  return (
    <PageFiller>
      <NavigationBar />
      <PageWrapper>
        <h2>{t("auth.signIn")}</h2>
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Logo size="100px" />
          </div>
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <button type="submit">{t("auth.signIn")}</button>
        </FormStyle>
        <Link to={routePath.REGISTER}>{t("auth.createAccount")}</Link>
      </PageWrapper>
    </PageFiller>
  );
}
