"use client";
import LoginWithGoogle from "@/components/LoginWithGoogle/LoginWithGoogle";
import AuthRoute from "@/auth/AuthRoute";

export const metadata = {
  title: "SwiftLink | Login ",
  description: "...",
};

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
