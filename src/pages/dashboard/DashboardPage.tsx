// import { useContext } from "react";
// import { AuthContext } from "src/contexts/AuthContext";
import styled from "styled-components";
import NavigationBar from "@components/NavigationBar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function DashboardPage() {
  // const { user } = useContext(AuthContext);
  return (
    <DashboardPageWrapper>
      <NavigationBar />
      <Container>
        <Sidebar />

        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </Container>
    </DashboardPageWrapper>
  );
}

const DashboardPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  background: ${({ theme }) => theme.colors.background === "#ffffff" ? "#f5f7fa" : "#000"};
`;

const ContentWrapper = styled.div`
  flex: 1;
`;
