import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Banner } from "../components/Banner/Banner";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ruflex</title>
        <meta
          name="description"
          content="Ruflex site for cinema and youtube channels"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1>Ruflex</h1>
        <Banner
          itemId={""}
          title="Clifford - the red dog"
          subtitle="an extremely cute dog"
          imgUrl="/static/clifford.webp"
        />
      </main>
    </>
  );
}
