export function generateSessionId(): string {
  const id = Math.random().toString(36).substring(2, 11);
  sessionStorage.setItem("session_id", id);
  return id;
}

export function getSessionId(): string {
  return sessionStorage.getItem("session_id") || generateSessionId();
}
