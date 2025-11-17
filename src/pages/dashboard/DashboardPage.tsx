import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import styled from "styled-components";
import NavigationBar from "@components/NavigationBar";
import VideoInput from "@components/VideoInput";

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <NavigationBar />
      <DashBoardPageWrapper>
        <VideoInput />
      </DashBoardPageWrapper>
    </>
  );
}
const DashBoardPageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
