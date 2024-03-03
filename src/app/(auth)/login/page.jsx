"use client";
import LoginWithGoogle from "@/components/LoginWithGoogle/LoginWithGoogle";
import AuthRoute from "@/auth/AuthRoute";

const LoginPage = () => {
  return (
    <AuthRoute>
      <title>SwiftLink | Login</title>
      <div>
        <LoginWithGoogle />
      </div>
    </AuthRoute>
  );
};

export default LoginPage;
