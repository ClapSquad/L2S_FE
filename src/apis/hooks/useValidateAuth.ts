import { axiosInstance } from "@apis/axiosInstance";
import { API } from "@apis/endpoints";
import type { UserInfoResponse } from "@apis/hooks/useMe";
import queryClient from "@apis/queryClient";
import routePath from "@router/routePath";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "src/contexts/AuthContext";

export function useValidateAuth() {
  const { setUser } = useContext(AuthContext);
  const { pathname } = useLocation();

  const update = async () => {
    try {
      const me = await queryClient.fetchQuery<UserInfoResponse>({
        queryKey: ["me"],
        queryFn: async () => {
          const res = await axiosInstance.get(API.AUTH.ME);
          return res.data;
        },
      });
      setUser({
        email: me.user.email,
        username: me.user.username,
      });
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (pathname === routePath.ERROR) return;
    update();
  }, []);
}
