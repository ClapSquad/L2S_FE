import { useContext, useEffect, type ReactNode } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigateBack } from "@hooks/userNavigateBack";
import { useMe } from "@apis/hooks/useMe";

export default function ProtectedRoute({ element }: { element: ReactNode }) {
  const { user, setUser, loading } = useContext(AuthContext);
  const navigateBack = useNavigateBack();
  const { isError } = useMe();

  useEffect(() => {
    if ((!loading && !user) || isError) {
      toast.info("Require login to see this page");
      setUser(null);
      navigateBack();
    }
  }, [user, loading, navigateBack]);

  if (loading) return null;
  if (!user) return null;

  return element;
}
