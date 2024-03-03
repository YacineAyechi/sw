"use client";

import Link from "next/link";
import "./sidebar.css";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BsFillPencilFill,
  BsLink45Deg,
  BsListUl,
  BsTelephoneFill,
} from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { SlMenu } from "react-icons/sl";
import { IoClose } from "react-icons/io5";

const Sidebar = ({ fixed }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // State variable for menu visibility

  const closeMenu = () => {
    setShowMenu(false); // Function to close the menu
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Function to toggle menu visibility
  };

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
    <>
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
              <Link href="/" className="mobile">
                <BsFillPencilFill />
              </Link>
              <Link href="/" className="desktop">
                Create
              </Link>
            </li>
            <li>
              <Link href="/mylinks" className="mobile">
                <BsListUl />
              </Link>
              <Link href="/mylinks" className="desktop">
                My Links
              </Link>
            </li>
            <li>
              <Link href="/contact" className="mobile">
                <BsTelephoneFill />
              </Link>
              <Link href="/contact" className="desktop">
                Contact Us
              </Link>
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
              <Link href="login" className="mobile">
                <FiLogOut />
              </Link>
              <Link href="/login" className="desktop">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mobileNav">
        <div className="mobileHamburger" onClick={toggleMenu}>
          <SlMenu className="hamburgerIcon" />
        </div>

        <div className="mobileLogo">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={40} height={40} />
          </Link>
        </div>
        <div className="mobileUserImage">
          <Link href="/">
            <Image src={user?.photoURL} alt="" width={40} height={40} />
          </Link>
        </div>
      </div>
      {showMenu && (
        <div className="menu">
          <div className="closeMenu">
            <IoClose onClick={closeMenu} />
          </div>
          <ul className="hamburgerOptions">
            <li>
              <Link href="/">Create</Link>
            </li>
            <li>
              <Link href="/mylinks">My Links</Link>
            </li>
            <li>
              <Link href="/mylinks">Contact Us</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
