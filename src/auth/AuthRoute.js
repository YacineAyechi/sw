"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";

const AuthRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return children;
};

export default AuthRoute;
