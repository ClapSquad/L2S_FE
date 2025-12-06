export const API = {
  HEALTH: {
    ALIVE: "/health/alive",
  },
  VIDEO: {
    UPLOAD: {
      FILE: "/video/upload/file",
      YOUTUBE: "/video/upload/youtube",
      PRESIGN: "/video/upload/presign",
      DONE: "/video/upload/done",
    },
    MY: "/video/my",
    DETAIL: (id: string) => `/video/${id}/detail`,
    DELETE: (id: string) => `/video/${id}/delete`,
    DOWNLOAD: "/video/download",
    RECENT: "/video/recent",
    RENAME: "/video/rename",
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
  RUNPOD: {
    PROCESS: "/runpod/process",
    SUMMARIZE: "/runpod/summarize",
    JOB: {
      MY: "/runpod/job/my",
      DELETE: (id: string) => `/runpod/job/${id}`,
      STATUS: (id: string) => `/runpod/job/${id}/status`,
    },
  },
} as const;
