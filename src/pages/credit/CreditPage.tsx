import styled from "styled-components";
import { useState } from "react";
import NavigationBar from "@components/NavigationBar";
import { useAddCredit } from "./hooks/useAddCredit";
import { useUseCredit } from "./hooks/useUseCredit";
import { useMe } from "@apis/hooks/useMe";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { creditPackages } from "./data/creditPackages";
import PackagesGrid from "./components/PackagesGrid";
import { toast } from "react-toastify";

export default function CreditPage() {
  const { data } = useMe();
  const { mutate: addMutate } = useAddCredit();
  const { mutate: useMutate } = useUseCredit();
  const [selectedAmount, setSelectedAmount] = useState<number>(5);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <>
      <NavigationBar />
      <CreditPageWrapper>
        <ContentContainer>
          <Header>
            <Title>
              Credit <HighlightText>Management</HighlightText>
            </Title>
            <Subtitle>
              Manage your credits and purchase more to continue creating amazing content
            </Subtitle>
          </Header>

          <CreditBalanceCard>
            <BalanceLabel>Your Current Balance</BalanceLabel>
            <BalanceAmount>{data!.user.credit}</BalanceAmount>
            <BalanceSubtext>credits available</BalanceSubtext>
          </CreditBalanceCard>

          <SectionTitle>Choose Your Package</SectionTitle>

          <PackagesGrid
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
          />

          <ActionButtons>
            <PrimaryButton onClick={() => setShowPaymentForm(true)}>
              Purchase {selectedAmount} Credits
            </PrimaryButton>
            <SecondaryButton
              onClick={() => {
                addMutate({ amount: selectedAmount });
              }}
            >
              Get {selectedAmount} Credits
            </SecondaryButton>
            <SecondaryButton
              onClick={() => {
                useMutate({ amount: selectedAmount });
              }}
            >
              Use {selectedAmount} Credits
            </SecondaryButton>
          </ActionButtons>

          {showPaymentForm && (
            <PaymentFormOverlay onClick={() => setShowPaymentForm(false)}>
              <PaymentFormModal onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Complete Your Purchase</ModalTitle>
                  <CloseButton onClick={() => setShowPaymentForm(false)}>
                    ×
                  </CloseButton>
                </ModalHeader>

                <ModalContent>
                  <OrderSummary>
                    <SummaryRow>
                      <span>Credits</span>
                      <span>{selectedAmount}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Price</span>
                      <span>
                        $
                        {
                          creditPackages.find(
                            (p) => p.credits === selectedAmount
                          )?.price
                        }
                      </span>
                    </SummaryRow>
                    <Divider />
                    <TotalRow>
                      <span>Total</span>
                      <span>
                        $
                        {
                          creditPackages.find(
                            (p) => p.credits === selectedAmount
                          )?.price
                        }
                      </span>
                    </TotalRow>
                  </OrderSummary>

                  <PaymentForm>
                    {/* <FormGroup>
                      <Label>Card Number</Label>
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </FormGroup>

                    <FormRow>
                      <FormGroup>
                        <Label>Expiry Date</Label>
                        <Input type="text" placeholder="MM/YY" maxLength={5} />
                      </FormGroup>
                      <FormGroup>
                        <Label>CVC</Label>
                        <Input type="text" placeholder="123" maxLength={3} />
                      </FormGroup>
                    </FormRow>

                    <FormGroup>
                      <Label>Cardholder Name</Label>
                      <Input type="text" placeholder="John Doe" />
                    </FormGroup>

                    <FormGroup>
                      <Label>Email</Label>
                      <Input type="email" placeholder="john@example.com" />
                    </FormGroup>

                    <PayButton onClick={handlePurchase}>
                      Pay $
                      {
                        creditPackages.find((p) => p.credits === selectedAmount)
                          ?.price
                      }
                    </PayButton> */}

                    <div style={{ padding: "10px" }}>
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(_data, actions) => {
                          const price =
                            creditPackages.find(
                              (p) => p.credits === selectedAmount
                            )?.price || 0;

                          return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                              {
                                description: `${selectedAmount} Credits`,
                                amount: {
                                  value: price.toString(),
                                  currency_code: "USD",
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={async (_data, actions) => {
                          const order = await actions?.order?.capture();
                          addMutate({ amount: selectedAmount });
                          setShowPaymentForm(false);
                          toast.success("Payment successful");
                          console.log("Payment successful!", order);
                        }}
                        onError={(err) => {
                          toast.error("There was an error with paypal payment");
                          console.error("PayPal payment error:", err);
                        }}
                      />
                    </div>

                    <SecurityNotice>
                      🔒 Your payment information is secure and encrypted
                    </SecurityNotice>
                  </PaymentForm>
                </ModalContent>
              </PaymentFormModal>
            </PaymentFormOverlay>
          )}
        </ContentContainer>
      </CreditPageWrapper>
    </>
  );
}

const CreditPageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) =>
    theme.colors.background === "#ffffff"
      ? "linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)"
      : "#000000"};
  padding: 40px 20px;
  padding-top: 100px;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#1a1a2e" : "white"};
  line-height: 1.2;
`;

const HighlightText = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #e91e63 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#6b7280" : "white"};
  max-width: 800px;
  margin: 0 auto;
`;

const CreditBalanceCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 60px;
  text-align: center;
  margin-bottom: 60px;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
  }
`;

const BalanceLabel = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
`;

const BalanceAmount = styled.div`
  color: white;
  font-size: 72px;
  font-weight: 800;
  margin-bottom: 8px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const BalanceSubtext = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 20px;
  font-weight: 500;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.background === "#ffffff" ? "#1a1a2e" : "white"};
  margin-bottom: 32px;
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 60px;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 18px 48px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 50px;
  padding: 18px 48px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PaymentFormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

const PaymentFormModal = styled.div`
  background: white;
  border-radius: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 36px;
  color: #9ca3af;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #1a1a2e;
  }
`;

const ModalContent = styled.div`
  padding: 32px;
`;

const OrderSummary = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 16px;
  color: #6b7280;
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 16px 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
`;

const PaymentForm = styled.div``;

// const FormGroup = styled.div`
//   margin-bottom: 20px;
// `;

// const FormRow = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 16px;
// `;

// const Label = styled.label`
//   display: block;
//   font-size: 14px;
//   font-weight: 600;
//   color: #374151;
//   margin-bottom: 8px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 14px 16px;
//   border: 2px solid #e5e7eb;
//   border-radius: 12px;
//   font-size: 16px;
//   transition: all 0.2s ease;
//   box-sizing: border-box;

//   &:focus {
//     outline: none;
//     border-color: #667eea;
//     box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//   }

//   &::placeholder {
//     color: #9ca3af;
//   }
// `;

// const PayButton = styled.button`
//   width: 100%;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   color: white;
//   border: none;
//   border-radius: 12px;
//   padding: 18px;
//   font-size: 18px;
//   font-weight: 700;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   margin-top: 8px;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
//   }

//   &:active {
//     transform: translateY(0);
//   }
// `;

const SecurityNotice = styled.div`
  text-align: center;
  font-size: 13px;
  color: #6b7280;
  margin-top: 20px;
`;
