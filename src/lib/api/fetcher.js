export async function apiFetch(path, options = {}) {
  const base = "http://localhost:4000/api";

  const res = await fetch(base + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    alert("Error: " + (await res.text()));
    throw new Error(await res.text());
  }

  return res.json();
}
