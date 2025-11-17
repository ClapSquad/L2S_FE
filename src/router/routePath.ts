const routePath = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  MY: "/my",
  DASHBOARD: "/dashboard",
  CREDIT: "/credit",
  ERROR: "/error",
};

export const dashboardSubPath = {
  UPLOAD: `${routePath.DASHBOARD}/upload`,
  VIDEO: `${routePath.DASHBOARD}/video/:id`,
  R_VIDEO: (id: number) => `${routePath.DASHBOARD}/video/${id}`,
};

export default routePath;
