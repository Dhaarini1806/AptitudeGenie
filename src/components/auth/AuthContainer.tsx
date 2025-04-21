
import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

interface AuthContainerProps {
  onAuthSuccess?: () => void;
}

export function AuthContainer({ onAuthSuccess }: AuthContainerProps) {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="w-full max-w-md mx-auto p-4">
      {isLogin ? (
        <LoginForm 
          onSuccess={onAuthSuccess} 
          onRegisterClick={() => setIsLogin(false)} 
        />
      ) : (
        <RegisterForm 
          onSuccess={onAuthSuccess} 
          onLoginClick={() => setIsLogin(true)} 
        />
      )}
    </div>
  );
}
