import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Banner } from "../components/Banner/Banner";
import { Navbar } from "../components/Navbar/Navbar";
import { SectionCards } from "../components/SectionCards/SectionCards";
import {
  fetchCommonVideos,
  fetchPopularVideos,
  fetchVideosBySearchQuery,
} from "../lib/videos";
import { Video } from "../components/SectionCards/SectionCards.props";

interface HomeProps {
  disneyVideos: Video[];
  watchItAgainVideos: Video[];
  travelVideos: Video[];
  productivityVideos: Video[];
  popularVideos: Video[];
}

export async function getServerSideProps() {
  const disneyVideos = fetchVideosBySearchQuery("disney trailer");
  const watchItAgainVideos = fetchVideosBySearchQuery("disney trailer");
  const travelVideos = fetchVideosBySearchQuery("travel");
  const productivityVideos = fetchVideosBySearchQuery("productivity");
  const popularVideos = fetchPopularVideos();

  return {
    props: {
      disneyVideos,
      watchItAgainVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
    },
  };
}

export default function Home({
  disneyVideos,
  watchItAgainVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}: HomeProps) {
  return (
    <>
      <Head>
        <title>Puffix</title>
        <meta
          name="description"
          content="Ruflex site for cinema and youtube channels"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <Banner
          itemId="4zH5iYM4wJo"
          title="Clifford - the red dog"
          subtitle="an extremely cute dog"
          imgUrl="/static/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="Disney"
            size="large"
            videos={disneyVideos}
            shouldWrap={false}
            shouldScale={false}
          />
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
            shouldWrap={false}
            shouldScale={false}
          />
          <SectionCards
            title="Travel"
            videos={travelVideos}
            size="small"
            shouldWrap={false}
            shouldScale={false}
          />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
            shouldWrap={false}
            shouldScale={false}
          />
          <SectionCards
            title="Popular"
            videos={popularVideos}
            size="small"
            shouldWrap={false}
            shouldScale={false}
          />
        </div>
      </main>
    </>
  );
}
function fetchVideos(arg0: string) {
  throw new Error("Function not implemented.");
}
