import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { NavbarProps } from "./Navbar.props";
import { MdHome, MdOutlineFavorite } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";
import React from "react";

export const Navbar = ({}: NavbarProps) => {
  const handleOnClickHome = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("signOut");
  };

  const handleOnClickMyList = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("signOut");
  };

  const handleShowDropDown = (e: React.MouseEvent) => {
    e.preventDefault();
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
          <li className={styles.navItem}>
            <MdHome />
            <p>Home</p>
          </li>
          <li className={styles.navItem}>
            <MdOutlineFavorite />
            <p>My List</p>
          </li>
        </ul>
        <div className={styles.userWrapper}>
          <button className={styles.userBtn}>
            <p>Username</p>
            <SlArrowDown className={styles.arrowDown} />
          </button>
          <div className={styles.navDropdown}>
            <a className={styles.linkName} onClick={handleSignout}>
              Sign out
            </a>
            <div className={styles.lineWrapper}></div>
          </div>
        </div>
      </div>
    </nav>
  );
};
