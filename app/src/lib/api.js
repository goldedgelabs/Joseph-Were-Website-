// src/lib/api.js

export const API_BASE = "https://joseph-were-website-backend.vercel.app";

export async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  return res.json();
}
