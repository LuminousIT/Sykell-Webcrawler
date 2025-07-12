import { loginRequest, registerRequest } from "@/api/auth";
import {
  authConfig,
  type handleLoginType,
  type TAuthValuesProvider,
  type TRegisterPayload,
  type User,
} from "@/api/auth/types";
import { getErrorMessage, getFromStorage, saveToStorage } from "@/utils";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "react-toastify";

const defaultProvider: TAuthValuesProvider = {
  user: null,
  loading: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = () => {
    setLoading(true);
    const token = getFromStorage(authConfig.token);
    if (token) {
      const user = getFromStorage(authConfig.userProfile);
      setUser(user as User);
    }
    setLoading(false);
  };

  const handleLogin: handleLoginType = async (payload, onSuccessCallback) => {
    try {
      const result = await loginRequest(payload);
      if (result) {
        saveToStorage(authConfig.token, result.token);
        saveToStorage(authConfig.userProfile, result.user);
        setUser(result.user);
        toast.success("Login successful.");
        onSuccessCallback();
      }
    } catch (error: unknown) {
      // @ts-expect-error ignore briefly
      const errorMessage = error?.response?.data?.error;
      toast.error(`Login failed. ${getErrorMessage(errorMessage || error)}`);
      throw new Error(errorMessage);
    }
  };

  const handleRegister = async (payload: TRegisterPayload) => {
    try {
      setLoading(true);
      const result = await registerRequest(payload);
      if (result) toast.success("Registration successful. Please Login");
    } catch (error: unknown) {
      toast.error(`Registration failed. ${getErrorMessage(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  const values = {
    user,
    loading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
