export const API = {
  HEALTH: {
    ALIVE: "/health/alive",
  },
  VIDEO: {
    UPLOAD: { FILE: "/video/upload/file", YOUTUBE: "/video/upload/youtube" },
    MY: "/video/my",
    DETAIL: (id: string) => `/video/${id}/detail`,
    DELETE: (id: string) => `/video/${id}/delete`,
    DOWNLOAD: "/video/download",
  },
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    WITHDRAW: "/auth/withdraw",
  },
  CREDIT: {
    ADD: "/credit/add",
    USE: "/credit/use",
  },
} as const;
