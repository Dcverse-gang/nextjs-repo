"use client";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const auth = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("cloneos_token");
  },

  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("cloneos_user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  setAuth: (token: string, user: User): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("cloneos_token", token);
    localStorage.setItem("cloneos_user", JSON.stringify(user));
  },

  clearAuth: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("cloneos_token");
    localStorage.removeItem("cloneos_user");
  },

  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("cloneos_token");
  },
};
