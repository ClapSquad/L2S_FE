import styled from "styled-components";
import Logo from "@components/Logo";
import { Link } from "react-router-dom";
import githubImage from "../assets/github.png";

export default function Footer() {
  return (
    <FooterWrapper>
      <TopGradientBorder />
      <FooterContent>
        <AboutSection>
          <Logo size="30px" />
          <Description>
            Transform your long-form videos into viral short-form content with
            AI-powered editing and automation.
          </Description>
        </AboutSection>

        <LinksSection>
          <LinkColumn>
            <ColumnTitle>Product</ColumnTitle>
            <FooterLink to="/">Features</FooterLink>
            <FooterLink to="/">Pricing</FooterLink>
            <FooterLink to="/">Use Cases</FooterLink>
            <FooterLink to="/">Demo</FooterLink>
            <FooterLink to="/">API</FooterLink>
          </LinkColumn>
          <LinkColumn>
            <ColumnTitle>Company</ColumnTitle>
            <FooterLink to="/">About</FooterLink>
            <FooterLink to="/">Blog</FooterLink>
            <FooterLink to="/">Careers</FooterLink>
            <FooterLink to="/">Press</FooterLink>
            <FooterLink to="/">Partners</FooterLink>
          </LinkColumn>
          <LinkColumn>
            <ColumnTitle>Resources</ColumnTitle>
            <FooterLink to="/">Help Center</FooterLink>
            <FooterLink to="/">Tutorials</FooterLink>
            <FooterLink to="/">Community</FooterLink>
            <FooterLink to="/">Creator Stories</FooterLink>
            <FooterLink to="/">Status</FooterLink>
          </LinkColumn>
          <LinkColumn>
            <ColumnTitle>Legal</ColumnTitle>
            <FooterLink to="/">Privacy Policy</FooterLink>
            <FooterLink to="/">Terms of Service</FooterLink>
            <FooterLink to="/">Cookie Policy</FooterLink>
            <FooterLink to="/">GDPR</FooterLink>
          </LinkColumn>
        </LinksSection>
      </FooterContent>
      <HorizontalRule />
      <FooterBottom>
        <Copyright>© 2025 Long2Short. All rights reserved.</Copyright>
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
