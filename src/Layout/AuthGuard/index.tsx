import { useAuth } from "@/hooks";
import ProtectedLayout from "../ProtectedLayout";
import { Navigate } from "react-router";
import FallbackSpinner from "./components/FallbackSpinner";

const AuthGuard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <FallbackSpinner />;
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return <ProtectedLayout />;
};

export default AuthGuard;
