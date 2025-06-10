import { BrowserRouter, Routes, Route } from "react-router";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import ToastContainer from "./components/ToastContainer";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { MessageProvider } from "./context/MessageContext";
import { useToast } from "./hooks/useToast";

export default function App() {
  const { toasts, removeToast } = useToast();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <MessageProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat/:userId"
                  element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <ToastContainer toasts={toasts} removeToast={removeToast} />
            </MessageProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
