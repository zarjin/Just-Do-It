import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute({ children }) {
  const { checkAuth } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const result = await checkAuth();
        setIsAuthenticated(result.success);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
