// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [token, setToken_] = useState(localStorage.getItem("token"));

//   const setToken = (newToken) => {
//     setToken_(newToken);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("isAdmin");
//     localStorage.removeItem("message");
//     setToken_(null);
//     window.location.href = "/home"; // Redirect using window.location.href
//   };

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   const contextValue = useMemo(
//     () => ({
//       token,
//       setToken,
//       logout,
//     }),
//     [token]
//   );

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const fetchWithAuth = async (url, options = {}) => {
//   const token = localStorage.getItem("token");

//   const headers = {
//     ...options.headers,
//     Authorization: token ? `Bearer ${token}` : "",
//   };

//   const response = await fetch(url, { ...options, headers });
//   return response;
// };

// export default AuthProvider;

// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [token, setToken_] = useState(localStorage.getItem("token"));
//   const [isAdmin, setIsAdmin] = useState(
//     localStorage.getItem("isAdmin") === "true"
//   );

//   const setToken = (newToken, adminStatus) => {
//     setToken_(newToken);
//     setIsAdmin(adminStatus);
//     localStorage.setItem("isAdmin", adminStatus);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("isAdmin");
//     setToken_(null);
//     setIsAdmin(false);
//     window.location.href = "/login";
//   };

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   const contextValue = useMemo(
//     () => ({
//       token,
//       isAdmin,
//       setToken,
//       logout,
//     }),
//     [token, isAdmin]
//   );

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const fetchWithAuth = async (url, options = {}) => {
//   const token = localStorage.getItem("token");

//   const headers = {
//     ...options.headers,
//     Authorization: token ? `Bearer ${token}` : "",
//   };

//   const response = await fetch(url, { ...options, headers });
//   return response;
// };

// export default AuthProvider;

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const setToken = (newToken, adminStatus) => {
    setToken_(newToken);
    setIsAdmin(adminStatus);
    localStorage.setItem("token", newToken);
    localStorage.setItem("isAdmin", adminStatus);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("message");
    setToken_(null);
    setIsAdmin(false);
    window.location.href = "/home";
  };

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      setIsAdmin(false); // Ensure isAdmin is false when no token is present
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      isAdmin,
      setToken,
      logout,
    }),
    [token, isAdmin]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  const response = await fetch(url, { ...options, headers });
  return response;
};

export default AuthProvider;
