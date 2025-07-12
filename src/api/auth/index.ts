import axios from "../index";
import type { IAuthResponse, TLoginPayload, TRegisterPayload } from "./types";

export const loginRequest = (payload: TLoginPayload): Promise<IAuthResponse> =>
  axios.post("/login", payload).then((res) => res.data);

export const registerRequest = (
  payload: TRegisterPayload
): Promise<IAuthResponse> =>
  axios.post("/register", payload).then((res) => res.data);
