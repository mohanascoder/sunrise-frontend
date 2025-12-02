import { apiFetch } from "./fetcher";

export const register = (data) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const login = (data) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const verifyOtp = (data) =>
  apiFetch("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(data)
  });
