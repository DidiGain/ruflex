import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Banner } from "../components/Banner/Banner";
import { Navbar } from "../components/Navbar/Navbar";
import { Card } from "../components/Card/Card";
import { SectionCards } from "../components/SectionCards/SectionCards";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ruflix</title>
        <meta
          name="description"
          content="Ruflex site for cinema and youtube channels"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <Banner
          itemId={""}
          title="Clifford - the red dog"
          subtitle="an extremely cute dog"
          imgUrl="/static/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="Disney"
            size="large"
            videos={[]}
            shouldWrap={false}
            shouldScale={false}
          />
          <SectionCards
            title="Watch it again"
            videos={[]}
            size="small"
            shouldWrap={false}
            shouldScale={false}
          />
          <SectionCards
            title="Travel"
            videos={[]}
            size="small"
            shouldWrap={false}
            shouldScale={false}
          />
          <SectionCards
            title="Productivity"
            videos={[]}
            size="medium"
            shouldWrap={false}
            shouldScale={false}
          />
          <SectionCards
            title="Popular"
            videos={[]}
            size="small"
            shouldWrap={false}
            shouldScale={false}
          />
        </div>
      </main>
    </>
  );
}
