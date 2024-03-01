"use client";

import Link from "next/link";
import "./sidebar.css";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = ({ fixed }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className={`sidebar${fixed ? " fixed" : ""}`}>
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={91} height={91} />
      </Link>
      <div className="userName">
        Hello, {user?.displayName || "Unknown User"}
      </div>
      <div className="sidebarLinks">
        <ul>
          <li>
            <Link href="/">Create</Link>
          </li>
          <li>
            <Link href="/mylinks">My Links</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
          {/* <li>
            <Link href="/about">About Us</Link>
          </li> */}
          {/* <li className="user-info">
            <div className="user-avatar">
              {user?.photoURL ? (
                <Image src={user.photoURL} width={40} height={40} />
              ) : (
                <div className="default-avatar">No Photo</div>
              )}
            </div>
            <div className="user-name">
              {user?.displayName || "Unknown User"}
            </div>
          </li> */}
          <li className="logout" onClick={handleLogout}>
            <Link href="/login">Log Out</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
