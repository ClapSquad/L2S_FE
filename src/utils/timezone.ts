export const formatDate = (utcString: string) => {
  return new Date(utcString).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
};
