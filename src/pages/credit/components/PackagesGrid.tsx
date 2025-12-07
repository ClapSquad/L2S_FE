import styled from "styled-components";
import { creditPackages } from "../data/creditPackages";

type PackagesGridProps = {
  selectedAmount: number;
  setSelectedAmount: React.Dispatch<React.SetStateAction<number>>;
};

export default function PackagesGrid({
  selectedAmount,
  setSelectedAmount,
}: PackagesGridProps) {
  return (
    <PackagesGridWrapper>
      {creditPackages.map((pkg) => (
        <PackageCard
          key={pkg.credits}
          $isSelected={selectedAmount === pkg.credits}
          $isPopular={pkg.popular}
          onClick={() => setSelectedAmount(pkg.credits)}
        >
          {pkg.popular && <PopularBadge>Most Popular</PopularBadge>}
          <PackageLabel>{pkg.label}</PackageLabel>
          <PackageCredits>{pkg.credits}</PackageCredits>
          <PackageCreditsLabel>credits</PackageCreditsLabel>
          <PackagePrice>${pkg.price}</PackagePrice>
          <PackagePricePerCredit>
            ${(pkg.price / pkg.credits).toFixed(2)} per credit
          </PackagePricePerCredit>
        </PackageCard>
      ))}
    </PackagesGridWrapper>
  );
}

const PackagesGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const PackageCard = styled.div<{ $isSelected: boolean; $isPopular: boolean }>`
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "white" : "#000"};
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid
    ${(props) =>
      props.theme.colors.background === "#ffffff"
        ? props.$isSelected
          ? "#667eea"
          : props.$isPopular
          ? "#e91e63"
          : "transparent"
        : props.$isSelected
        ? "#667eea"
        : "#666"};
  box-shadow: ${(props) =>
    props.theme.colors.background === "#ffffff"
      ? props.$isSelected
        ? "0 12px 40px rgba(102, 126, 234, 0.3)"
        : "0 4px 20px rgba(0, 0, 0, 0.08)"
      : props.$isSelected
      ? "0 12px 40px rgba(102, 126, 234, 0.5)"
      : "0 4px 12px rgba(255, 255, 255, 0.25), 4px 0 12px rgba(255, 255, 255, 0.25), -4px 0 12px rgba(255, 255, 255, 0.25), 0 -4px 12px rgba(255, 255, 255, 0.25)"};
  transform: ${(props) => (props.$isSelected ? "scale(1.05)" : "scale(1)")};
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme }) =>
      theme.colors.background === "#ffffff"
        ? "0 12px 40px rgba(0, 0, 0, 0.15)"
        : "0 6px 24px rgba(255, 255, 255, 0.3), 6px 0 24px rgba(255, 255, 255, 0.3), -6px 0 24px rgba(255, 255, 255, 0.3), 0 -6px 24px rgba(255, 255, 255, 0.3)"};
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #e91e63 0%, #f06292 100%);
  color: white;
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PackageLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#6b7280" : "white"};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 16px;
  font-weight: 600;
`;

const PackageCredits = styled.div`
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #e91e63 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
`;

const PackageCreditsLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#9ca3af" : "white"};
  margin-bottom: 20px;
`;

const PackagePrice = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#1a1a2e" : "white"};
  margin-bottom: 8px;
`;

const PackagePricePerCredit = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#9ca3af" : "white"};
`;
