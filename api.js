// ============================================================
//  SmartLIB — Shared API Config
//  All pages import this for the base URL and helper functions
// ============================================================

const API_BASE = "https://library-backend-1m1a.onrender.com";

// ── Simple session helpers (no JWT — backend uses in-memory IDs) ──
const Session = {
  save(user) { localStorage.setItem("smartlib_user", JSON.stringify(user)); },
  get()      { try { return JSON.parse(localStorage.getItem("smartlib_user")); } catch { return null; } },
  clear()    { localStorage.removeItem("smartlib_user"); },
  userId()   { const u = Session.get(); return u ? u.id : 1; }, // fallback 1 for demo
  name()     { const u = Session.get(); return u ? (u.name || u.email) : "Guest"; }
};

// ── Generic fetch wrapper ──
async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}
