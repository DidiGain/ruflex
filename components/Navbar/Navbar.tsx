import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { NavbarProps } from "./Navbar.props";
import { MdHome, MdOutlineFavorite } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";

export const Navbar = ({}: NavbarProps) => {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);

  const handleOnClickHome = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/my-list");
  };

  const handleShowDropDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDropDown((prev) => !prev);
  };

  const handleSignout = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("signOut");
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <Image
            className={styles.logoIcon}
            src="/static/icons/cinema-icon.svg"
            alt="Ruflex logo"
            width="60"
            height="60"
          />
        </Link>
        <h1 className={styles.logoTitle}>Puffix</h1>
      </div>
      <div className={styles.rightContent}>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            <MdHome />
            <p>Home</p>
          </li>
          <li className={styles.navItem} onClick={handleOnClickMyList}>
            <MdOutlineFavorite />
            <p>My List</p>
          </li>
        </ul>
        <div className={styles.userWrapper}>
          <button className={styles.userBtn} onClick={handleShowDropDown}>
            <p>Username</p>
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
