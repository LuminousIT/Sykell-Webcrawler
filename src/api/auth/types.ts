export type TRegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export interface IAuthResponse {
  token: string;
  user: Omit<User, "created_at">;
}

export type TLoginPayload = Omit<TRegisterPayload, "email">;

export type User = {
  username: string;
  id: number;
  email: string;
  created_at?: string;
};

export type TAuthValuesProvider = {
  user: User | null;
  loading: boolean;
  login: (payload: TLoginPayload, onSuccessCallback: () => void) => void;
  logout: () => void;
  register: (payload: TRegisterPayload) => void;
};

export const authConfig = {
  token: "@token",
  userProfile: "@userProfile",
};

export type handleLoginType = (
  payload: TLoginPayload,
  onSuccessCallback: () => void
) => void;
