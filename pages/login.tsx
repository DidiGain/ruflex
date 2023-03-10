import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import React, {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useState,
  KeyboardEvent,
} from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => setIsLoading(false);
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

  const handleLoginWithEmail = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (email) {
      try {
        setIsLoading(true);

        const didToken = await magic?.auth.loginWithMagicLink({
          email,
          showUI: true,
        });

        if (didToken) {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${didToken}`,
              "Content-Type": "application/json",
            },
          });

          const loggedInResponse = await response.json();

          if (loggedInResponse.done) {
            router.push("/");
          } else {
            setIsLoading(false);
            setUserMsg(
              "Something went wrong while loggin in. Please, try again later."
            );
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log(`Error while singing in: ${error}`);
      }
    } else {
      setIsLoading(false);
      setUserMsg("Enter a valid email address");
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const k = e.key;
    if (k === "Enter") {
      handleLoginWithEmail(e);
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
            value={email}
            onKeyDown={handleKeyDown}
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
