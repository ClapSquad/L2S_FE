const parseUTC = (str: string) => {
  const utcString = str.endsWith("Z") ? str : str + "Z";
  return new Date(utcString);
};

export const formatDate = (utcString: string) => {
  return new Date(parseUTC(utcString)).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
};
