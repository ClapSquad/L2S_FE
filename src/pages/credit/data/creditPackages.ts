export type CreditPackageType = {
  credits: number;
  price: number;
  label: string;
  popular: boolean;
};

export const creditPackages: CreditPackageType[] = [
  { credits: 5, price: 5, label: "Starter", popular: false },
  { credits: 20, price: 18, label: "Basic", popular: false },
  { credits: 50, price: 40, label: "Pro", popular: true },
  { credits: 100, price: 75, label: "Premium", popular: false },
];
