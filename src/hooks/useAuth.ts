import { useCallback, useState } from "react";
import { login as loginRequest } from "../lib/googleSheets";

const STORAGE_KEY = "auy-portal-email";

function getStoredEmail() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(STORAGE_KEY);
}

export function useAuth() {
  const [userEmail, setUserEmail] = useState<string | null>(() => getStoredEmail());
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setAuthError(null);
    setAuthLoading(true);

    try {
      const response = await loginRequest({ email, password });
      const normalizedEmail = response.email.toLowerCase();
      setUserEmail(normalizedEmail);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, normalizedEmail);
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUserEmail(null);
    setAuthError(null);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    authError,
    authLoading,
    isAuthenticated: Boolean(userEmail),
    login,
    logout,
    userEmail,
  };
}