/* Spark — authentication helpers (SPEC.md Section 6).
   Prototype only: no real auth. The password field is decorative; any
   non-empty value passes. The current user lives in spark_runtime.currentUser. */

const VALID_EMAILS = ['sarah.chen@cibc.com', 'david.kim@cibc.com'];

function getCurrentUser() {
  const runtime = getRuntime();
  const email = runtime.currentUser;
  if (!email) return null;
  const user = SPARK_DATA.users[email];
  if (!user) return null;
  return { email, ...user };
}

/* Returns { ok: true } on success, or { ok: false, error } on bad email.
   Password is intentionally ignored beyond being non-empty (prototype). */
function login(email) {
  const normalized = (email || '').trim().toLowerCase();
  if (!VALID_EMAILS.includes(normalized)) {
    return {
      ok: false,
      error: 'Email not recognized. Try sarah.chen@cibc.com or david.kim@cibc.com.'
    };
  }
  updateRuntime({ currentUser: normalized });
  return { ok: true };
}

function logout() {
  updateRuntime({ currentUser: null });
}

/* Auth guard for every page except login.html (SPEC.md Section 6.2). */
function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return null;
  }
  return user;
}
