import styled from "styled-components";
import NavigationBar from "@components/NavigationBar";
import { useAddCredit } from "./hooks/useAddCredit";
import { useUseCredit } from "./hooks/useUseCredit";
import { useMe } from "@apis/hooks/useMe";

export default function CreditPage() {
  const { data } = useMe();
  const { mutate: addMutate } = useAddCredit();
  const { mutate: useMutate } = useUseCredit();

  return (
    <>
      <NavigationBar />
      <CreditPageWrapper>
        You have {data!.user.credit} credits{" "}
        <button
          onClick={() => {
            addMutate({ amount: 5 });
          }}
        >
          Get more credits
        </button>
        <button
          onClick={() => {
            useMutate({ amount: 5 });
          }}
        >
          Use credits
        </button>
      </CreditPageWrapper>
    </>
  );
}

const CreditPageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
