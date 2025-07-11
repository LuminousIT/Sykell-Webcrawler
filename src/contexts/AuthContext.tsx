import type { TAuthValuesProvider, User } from "@/api/auth/types";
import { getFromStorage } from "@/utils";
import { createContext, useEffect, useState, type ReactNode } from "react";

const defaultProvider: TAuthValuesProvider = {
  user: null,
  loading: true,
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
    const token = getFromStorage("token");
    if (token) {
      const user = getFromStorage("userProfile");
      setUser(user as User);
    }
  };

  const values = {
    user,
    loading,
    login: () => {},
    logout: () => {},
    register: () => {},
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
