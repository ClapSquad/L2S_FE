export const API = {
  HEALTH: {
    ALIVE: "/health/alive",
  },
  FILE: {
    UPLOAD: "/file/upload",
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
