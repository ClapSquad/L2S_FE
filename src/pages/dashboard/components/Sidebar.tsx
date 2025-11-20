import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { dashboardSubPath } from "@router/routePath";
import { useFetchMyVideo } from "../hooks/useFetchMyVideo";

export default function DashboardPage() {
  const { data } = useFetchMyVideo();
  const navigate = useNavigate();
  return (
    <Sidebar>
      <MenuItem
        onClick={() => {
          navigate(dashboardSubPath.UPLOAD);
        }}
      >
        Video Upload
      </MenuItem>
      {data?.videos.map((video) => {
        return (
          <MenuItem
            key={video.id}
            onClick={() => {
              navigate(dashboardSubPath.R_VIDEO(video.id));
            }}
          >
            {video.id}
          </MenuItem>
        );
      })}
    </Sidebar>
  );
}

const Sidebar = styled.div`
  width: 240px;
  background: #111827;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: calc(100vh - 110px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    margin: 8px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #f472b6 100%);
    box-shadow: 0 0 8px rgba(236, 72, 153, 0.5);
  }

  &::-webkit-scrollbar-thumb:active {
    background: linear-gradient(135deg, #5b21b6 0%, #db2777 100%);
  }

  scrollbar-width: thin;
  scrollbar-color: #6366f1 rgba(255, 255, 255, 0.05);
`;

const MenuItem = styled.button`
  padding: 12px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  color: #fff;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
  transition: 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;
