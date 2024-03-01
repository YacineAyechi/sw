"use client";
import LoginWithGoogle from "@/components/LoginWithGoogle/LoginWithGoogle";
import AuthRoute from "@/auth/AuthRoute";

const LoginPage = () => {
  return (
    <AuthRoute>
      <div>
        <LoginWithGoogle />
      </div>
    </AuthRoute>
  );
};

export default LoginPage;
