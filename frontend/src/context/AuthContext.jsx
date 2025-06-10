import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const BACKEND_API = import.meta.env.VITE_API_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const register = async (userData) => {
    try {
      const response = await axios.post(
        `${BACKEND_API}/auth/register`,
        userData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "User registered successfully.") {
        setIsAuthenticated(true);
      }

      return response.data;
    } catch (error) {
      return error.response?.data || { message: "Registration failed" };
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post(`${BACKEND_API}/auth/login`, userData, {
        withCredentials: true,
      });

      if (response.data.message === "User logged in successfully.") {
        setIsAuthenticated(true);
      }

      return response.data;
    } catch (error) {
      return error.response?.data || { message: "Login failed" };
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_API}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      setIsAuthenticated(false);
      return response.data;
    } catch (error) {
      setIsAuthenticated(false);
      return error.response?.data || { message: "Logout failed" };
    }
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${BACKEND_API}/user/get-user`, {
        withCredentials: true,
      });

      if (response.data && response.data._id) {
        setIsAuthenticated(true);
        return { success: true, user: response.data };
      } else {
        setIsAuthenticated(false);
        return { success: false };
      }
    } catch (error) {
      setIsAuthenticated(false);
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{ register, login, logout, checkAuth, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
