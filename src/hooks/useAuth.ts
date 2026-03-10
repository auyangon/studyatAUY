import { useCallback, useMemo, useState } from "react";
import type { CredentialResponse } from "@react-oauth/google";

export type AuthUser = {
  email: string;
  name: string;
  givenName: string;
  picture?: string;
};

const STORAGE_KEY = "auy-student-portal-user";

const parseJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const payload = token.split(".")[1];
    if (!payload) {
      return null;
    }
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof decoded === "object" && decoded !== null ? (decoded as Record<string, unknown>) : null;
  } catch {
    return null;
  }
};

const getStoredUser = (): AuthUser | null => {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  const saveUser = useCallback((nextUser: AuthUser) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const login = useCallback((response: CredentialResponse) => {
    if (!response.credential) {
      return false;
    }

    const payload = parseJwtPayload(response.credential);
    if (!payload) {
      return false;
    }

    const email = String(payload.email ?? "");
    const name = String(payload.name ?? "Student");
    const givenName = String(payload.given_name ?? name.split(" ")[0] ?? "Student");
    const picture = payload.picture ? String(payload.picture) : undefined;

    if (!email) {
      return false;
    }

    const nextUser: AuthUser = {
      email,
      name,
      givenName,
      picture,
    };

    saveUser(nextUser);
    return true;
  }, [saveUser]);

  const loginWithEmail = useCallback(
    (email: string, name = "AUY Student") => {
      if (!email) {
        return false;
      }

      const safeName = name.trim() || "AUY Student";
      const givenName = safeName.split(" ")[0] ?? "Student";
      saveUser({
        email,
        name: safeName,
        givenName,
      });
      return true;
    },
    [saveUser]
  );

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      loginWithEmail,
      logout,
    }),
    [user, login, loginWithEmail, logout]
  );
};