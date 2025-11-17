import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useFetchVideoDetail } from "../hooks/useFetchVideoDetail";
import { useDeleteMyVideo } from "../hooks/useDeleteMyVideo";
import { API } from "@apis/endpoints";

export default function VideoPage() {
  const id = useParams().id!;
  const { data } = useFetchVideoDetail({ id });
  const { mutate } = useDeleteMyVideo();

  return (
    <DashBoardPageWrapper>
      <p>Video ID:{data?.id} </p>
      <p>Uploader user ID: {data?.user_id}</p>
      <p>Youtube ID:{data?.youtube_id} </p>
      <p>Static file path: {data?.file_path}</p>
      <button onClick={() => mutate(id)}>Delete</button>
      <a href={`${API.VIDEO.DOWNLOAD}?video_id=${id}`} download>
        Download
      </a>
    </DashBoardPageWrapper>
  );
}
const DashBoardPageWrapper = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: calc(100vh - 150px);
  overflow-y: auto;
`;
