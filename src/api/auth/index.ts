import axios from "../index";
import type { TLoginPayload, TRegisterPayload } from "./types";

export const loginRequest = (payload: TLoginPayload) =>
  axios.post("/login", payload).then((res) => res.data);
export const registerRequest = (payload: TRegisterPayload) =>
  axios.post("/register", payload).then((res) => res.data);
