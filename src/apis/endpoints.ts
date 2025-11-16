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
} as const;
