import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      {mode === "login" ? (
        <LoginForm
          onSuccess={() => (window.location.href = "/dashboard")}
          onRegisterClick={() => setMode("register")}
        />
      ) : (
        <RegisterForm
          onSuccess={() => setMode("login")}
          onLoginClick={() => setMode("login")}
        />
      )}
    </div>
  );
}
