"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import Cookies from "js-cookie";
import AuthModal from "./AuthModal";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [open, setOpen] = useState(false);
  // Pending actions now store both success and cancel callbacks.
  const pendingActionsRef = useRef([]);
  const [reason, setReason] = useState("");

  const openAuth = useCallback((onSuccess, reasonText = "", onCancel) => {
    // Replace any pending action — a new request supersedes the old one.
    pendingActionsRef.current = [];
    if (typeof onSuccess === "function" || typeof onCancel === "function") {
      pendingActionsRef.current.push({ onSuccess, onCancel });
    }
    setReason(reasonText);
    setOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setOpen(false);
    setReason("");
    const pending = pendingActionsRef.current;
    pendingActionsRef.current = [];
    
    // Fire the onCancel callbacks if the user dismissed the modal
    pending.forEach(({ onCancel }) => {
      if (typeof onCancel === "function") {
        try {
          onCancel();
        } catch (e) {
          console.error("[AuthProvider] cancel action failed", e);
        }
      }
    });
  }, []);

  const handleLoginSuccess = useCallback((result) => {
    setOpen(false);
    setReason("");
    const pending = pendingActionsRef.current;
    pendingActionsRef.current = [];
    
    // Fire the onSuccess callbacks
    pending.forEach(({ onSuccess }) => {
      if (typeof onSuccess === "function") {
        try {
          onSuccess(result);
        } catch (e) {
          console.error("[AuthProvider] pending action failed", e);
        }
      }
    });
  }, []);

  const requireAuth = useCallback(
    (onSuccess, reasonText = "", onCancel) => {
      const token =
        typeof window !== "undefined" ? Cookies.get("id_token") : null;
      if (token) {
        if (typeof onSuccess === "function") onSuccess();
        return true;
      }
      // Pass onCancel to openAuth
      openAuth(onSuccess, reasonText, onCancel);
      return false;
    },
    [openAuth]
  );

  return (
    <AuthContext.Provider
      value={{ openAuth, closeAuth, requireAuth, isOpen: open }}
    >
      {children}
      <AuthModal
        open={open}
        reason={reason}
        onClose={closeAuth}
        onSuccess={handleLoginSuccess}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}