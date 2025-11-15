import { useIsLoggedIn } from "@hooks/useIsLoggedIn";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routePath from "@router/routePath";

export function useRejectLoggedInUser() {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();
  useEffect(() => {
    if (isLoggedIn) {
      navigate(routePath.HOME);
    }
  }, [isLoggedIn]);
}
