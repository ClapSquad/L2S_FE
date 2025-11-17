import { useContext, useEffect, type ReactNode } from "react";
import { AuthContext } from "src/contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigateBack } from "@hooks/userNavigateBack";

export default function ProtectedRoute({ element }: { element: ReactNode }) {
  const { user, loading } = useContext(AuthContext);
  const navigateBack = useNavigateBack();

  useEffect(() => {
    if (!loading && !user) {
      toast.info("Require login to see this page");
      navigateBack();
    }
  }, [user, loading, navigateBack]);

  if (loading) return null;
  if (!user) return null;

  return element;
}
