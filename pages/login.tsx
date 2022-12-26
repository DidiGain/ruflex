import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";
import { RPCError, RPCErrorCode } from "magic-sdk";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleComplete = () => setIsLoading(false);

  useEffect(() => {
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleOnChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserMsg("");
    setEmail(e.target.value);
  };

  const handleLoginWithEmail = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (email) {
      try {
        setIsLoading(true);

        const didToken = await magic?.auth.loginWithMagicLink({
          email,
        });

        if (didToken) {
          router.push("/");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Something went wrong while loggin in", error);
        if (error instanceof RPCError) {
          switch (error.code) {
            case RPCErrorCode.MagicLinkFailedVerification:
              console.log(error.code);
            case RPCErrorCode.MagicLinkExpired:
              console.log(error.code);
            case RPCErrorCode.MagicLinkRateLimited:
              console.log(error.code);
            case RPCErrorCode.UserAlreadyLoggedIn:
              console.log(error.code);
              break;
          }
        }
      }
    } else {
      setIsLoading(false);
      setUserMsg("Enter a valid email address");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Head>
        <title>Puffix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <Image
              src="/static/icons/cinema-icon.svg"
              alt="Puffix logo"
              width="50"
              height="50"
            />
            <p className={styles.logoTitle}>Puffix</p>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
            tabIndex={0}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button
            className={styles.loginBtn}
            onClick={handleLoginWithEmail}
            tabIndex={0}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
