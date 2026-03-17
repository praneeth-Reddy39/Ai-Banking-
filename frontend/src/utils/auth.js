function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded || {};
  } catch {
    return {};
  }
}

export function isTokenValid(token) {
  if (!token) return false;
  const payload = decodeToken(token);
  const exp = payload.exp ? payload.exp * 1000 : 0;
  if (!exp) return true;
  return Date.now() < exp;
}

export function getUserEmail(token) {
  const payload = decodeToken(token);
  return payload.sub || payload.email || null;
}

export function getExpiry(token) {
  const payload = decodeToken(token);
  return payload.exp ? payload.exp * 1000 : null;
}
