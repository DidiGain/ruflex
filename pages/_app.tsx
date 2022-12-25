import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading/Loading";
import { magic } from "../lib/magic-client";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLoggedIn = async () => {
      const isUserLoggedIn = await magic?.user.isLoggedIn();

      if (isUserLoggedIn) router.push("/");
      else router.push("/login");
    };
    handleLoggedIn();
  }, [router]);

  const handleComplete = () => setIsLoading(false);

  useEffect(() => {
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}
