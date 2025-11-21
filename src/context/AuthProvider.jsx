import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // Load auth from localStorage
  const initialAuth = localStorage.getItem("auth");
  const [authUser, setAuthUser] = useState(
    initialAuth ? JSON.parse(initialAuth) : null
  );

  // Update auth and sync with localStorage
  const updateAuth = (data) => {
    setAuthUser(data);

    if (data) {
      localStorage.setItem("auth", JSON.stringify(data));
      if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);
      if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
      if (data.idToken) localStorage.setItem("idToken", data.idToken);
      if (data.expiresIn) localStorage.setItem("expiresIn", data.expiresIn);
    } else {
      localStorage.removeItem("auth");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("idToken");
      localStorage.removeItem("expiresIn");
    }
  };

  // Auto logout on token expiry
  useEffect(() => {
    const expiresIn = localStorage.getItem("expiresIn");
    if (!expiresIn) return;

    const expiryTime = Number(expiresIn) * 1000;
    const timer = setTimeout(() => {
      updateAuth(null);
      console.log("⏳ Token expired → auto logout");
    }, expiryTime);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthContext.Provider value={[authUser, updateAuth]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
