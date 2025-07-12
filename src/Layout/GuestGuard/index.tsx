import { useAuth } from "@/hooks";
import UnprotectedLayout from "../UnprotectedLayout";
import { Navigate } from "react-router";

const GuestGuard = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <UnprotectedLayout />;
};

export default GuestGuard;
