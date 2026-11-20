export type AuthUser = {
  id: number;
  name: string;
  email: string;
  registration_number: string;
  role: "admin" | "teacher";
};

type AuthSession = {
  token: string;
  user: AuthUser;
};

const SESSION_KEY = "lab-agenda-session";

export const saveSession = (session: AuthSession) => {
  if (typeof window === "undefined") return;

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getSession = (): AuthSession | null => {
  if (typeof window === "undefined") return null;

  const stored = sessionStorage.getItem(SESSION_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored) as AuthSession;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
};

export const clearSession = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SESSION_KEY);
  }
};
