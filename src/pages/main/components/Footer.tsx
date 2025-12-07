import styled from "styled-components";
import Logo from "@components/Logo";
import { Link } from "react-router-dom";
import githubImage from "../assets/github.png";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <FooterWrapper>
      <TopGradientBorder />
      <FooterContent>
        <AboutSection>
          <Logo size="30px" />
          <Description>
            {t('footer.description')}
          </Description>
        </AboutSection>

        <LinksSection>
          <LinkColumn>
            <ColumnTitle>{t('footer.product')}</ColumnTitle>
            <FooterLink to="/">{t('footer.features')}</FooterLink>
            <FooterLink to="/">{t('footer.pricing')}</FooterLink>
            <FooterLink to="/">{t('footer.useCases')}</FooterLink>
            <FooterLink to="/">{t('footer.demo')}</FooterLink>
            <FooterLink to="/">{t('footer.api')}</FooterLink>
          </LinkColumn>
          <LinkColumn>
            <ColumnTitle>{t('footer.company')}</ColumnTitle>
            <FooterLink to="/">{t('footer.about')}</FooterLink>
            <FooterLink to="/">{t('footer.blog')}</FooterLink>
            <FooterLink to="/">{t('footer.careers')}</FooterLink>
            <FooterLink to="/">{t('footer.press')}</FooterLink>
            <FooterLink to="/">{t('footer.partners')}</FooterLink>
          </LinkColumn>
          <LinkColumn>
            <ColumnTitle>{t('footer.resources')}</ColumnTitle>
            <FooterLink to="/">{t('footer.helpCenter')}</FooterLink>
            <FooterLink to="/">{t('footer.tutorials')}</FooterLink>
            <FooterLink to="/">{t('footer.community')}</FooterLink>
            <FooterLink to="/">{t('footer.creatorStories')}</FooterLink>
            <FooterLink to="/">{t('footer.status')}</FooterLink>
          </LinkColumn>
          <LinkColumn>
            <ColumnTitle>{t('footer.legal')}</ColumnTitle>
            <FooterLink to="/">{t('footer.privacyPolicy')}</FooterLink>
            <FooterLink to="/">{t('footer.termsOfService')}</FooterLink>
            <FooterLink to="/">{t('footer.cookiePolicy')}</FooterLink>
            <FooterLink to="/">{t('footer.gdpr')}</FooterLink>
          </LinkColumn>
        </LinksSection>
      </FooterContent>
      <HorizontalRule />
      <FooterBottom>
        <Copyright>{t('footer.copyright')}</Copyright>
        <SocialIcons>
          <SocialIconLink href="https://github.com/ClapSquad" target="_blank">
            <img src={githubImage} alt="Github Image" width="25px" />
          </SocialIconLink>
        </SocialIcons>
      </FooterBottom>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #0e0b1a;
  color: #a9a9b3;
  padding-bottom: 30px;
`;

const TopGradientBorder = styled.div`
  height: 3px;
  background: linear-gradient(90deg, #6225e6, #f44286);
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 60px;
  gap: 40px;

  @media (max-width: 768px) {
    padding: 40px 20px;
    flex-direction: column;
  }
`;

const AboutSection = styled.div`
  flex: 1.5;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  max-width: 350px;
`;

const LinksSection = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 140px;
`;

const ColumnTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  margin: 0 0 8px 0;
`;

const FooterLink = styled(Link)`
  color: #a9a9b3;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: #ffffff;
    text-decoration: underline;
  }
`;

const HorizontalRule = styled.hr`
  border: none;
  height: 1px;
  background-color: #1f1d2b;
  margin: 20px 60px;

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 0 20px;
    flex-direction: column-reverse;
  }
`;

const Copyright = styled.p`
  font-size: 13px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  color: #a9a9b6;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
    background-color: #3a3a4d;
  }
`;
