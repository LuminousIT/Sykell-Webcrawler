import { useAuth } from "@/hooks";
import ProtectedLayout from "../ProtectedLayout";
import { Navigate } from "react-router";

const AuthGuard = () => {
  const { user } = useAuth();

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return <ProtectedLayout />;
};

export default AuthGuard;
