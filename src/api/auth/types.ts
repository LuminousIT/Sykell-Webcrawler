export type TRegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type TLoginPayload = Omit<TRegisterPayload, "email">;

export type User = {
  username: string;
  id: number;
  email: string;
  created_at: string;
};

export type TAuthValuesProvider = {
  user: User | null;
  loading: boolean;
  login: (payload: TLoginPayload) => void;
  logout: () => void;
  register: (payload: TRegisterPayload) => void;
};
