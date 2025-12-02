import { apiFetch } from "./fetcher";

export const getProperties = () => apiFetch("/properties");

export const getProperty = (id) => apiFetch(`/properties/${id}`);

export const addProperty = (data) =>
  apiFetch("/properties", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const placeBid = (id, data) =>
  apiFetch(`/properties/${id}/bid`, {
    method: "POST",
    body: JSON.stringify(data),
  });
