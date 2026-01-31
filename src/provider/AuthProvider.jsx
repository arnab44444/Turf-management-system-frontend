import React, { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      api
        .get("/auth/me")
        .then(({ data }) => setUser(data))
        .catch(() => {
          localStorage.removeItem("access-token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signOutUser = () => {
    localStorage.removeItem("access-token");
    setUser(null);
  };

  const authData = { user, setUser, loading, signOutUser };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
}
