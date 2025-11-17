export const API = {
  HEALTH: {
    ALIVE: "/health/alive",
  },
  VIDEO: {
    UPLOAD: { FILE: "/video/upload/file", YOUTUBE: "/video/upload/youtube" },
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
