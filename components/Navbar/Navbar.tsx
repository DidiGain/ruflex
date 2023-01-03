import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { NavbarProps } from "./Navbar.props";
import { MdHome, MdOutlineFavorite } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";
import { magic } from "../../lib/magic-client";

export const Navbar = ({}: NavbarProps) => {
  const [username, setUsername] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [didToken, setDidToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const user = await magic?.user.getMetadata();
        const didToken = await magic?.user.getIdToken();

        if (user) {
          setUsername(user.email as string);
          setDidToken(didToken as string);
        }
      } catch (error) {
        console.error("Error retrieving email", error);
      }
    };

    getUserEmail();
  }, [username]);

  const handleOnClickHome = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/my-list");
  };

  const handleShowDropDown = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowDropDown((prev) => !prev);
  };

  const handleSignout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Something went wrong signing out", error);
      router.push("/login");
    }
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <Image
            className={styles.logoIcon}
            src="/static/icons/cinema-icon.svg"
            alt="Puffix logo"
            width="50"
            height="50"
          />
        </Link>
        <h1 className={styles.logoTitle}>Puffix</h1>
      </div>
      <div className={styles.rightContent}>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            <MdHome />
            <p className={styles.navItem__title}>Home</p>
          </li>
          <li className={styles.navItem} onClick={handleOnClickMyList}>
            <MdOutlineFavorite />
            <p className={styles.navItem__title}>My List</p>
          </li>
        </ul>
        <div className={styles.userWrapper}>
          <button
            className={styles.userBtn}
            onClick={handleShowDropDown}
            onBlur={handleShowDropDown}
          >
            <p>{username}</p>
            <SlArrowDown className={styles.arrowDown} />
          </button>
          {showDropDown && (
            <div className={styles.navDropdown}>
              <a className={styles.linkName} onClick={handleSignout}>
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
