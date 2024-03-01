"use client";

import Image from "next/image";
import Link from "next/link";
import "./LoginWithGoogle.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/app/firebase"; // Import auth from firebase.js

const LoginWithGoogle = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      router.push("/"); // Example: redirect to dashboard after login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="loginV">
      <Link href="/login">
        <Image src="/logo.svg" alt="logo" width={91} height={91} />
      </Link>
      <button onClick={handleGoogleLogin}>Log In With Google</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginWithGoogle;
