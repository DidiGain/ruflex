import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Banner } from "../components/Banner/Banner";
import { Navbar } from "../components/Navbar/Navbar";
import { SectionCards } from "../components/SectionCards/SectionCards";
import {
  fetchCommonVideos,
  fetchPopularVideos,
  fetchVideos,
} from "../lib/videos";
import { Video } from "../components/SectionCards/SectionCards.props";

interface HomeProps {
  disneyVideos: Video[];
  watchItAgainVideos: Video[];
  travelVideos: Video[];
  productivityVideos: Video[];
  popularVideos: Video[];
}

// export async function getServerSideProps() {
//   const disneyVideos = await fetchVideos("disney trailer");
//   const watchItAgainVideos = await fetchVideos("disney trailer");
//   const travelVideos = await fetchVideos("travel");
//   const productivityVideos = await fetchVideos("productivity");
//   const popularVideos = await fetchPopularVideos();

//   return {
//     props: {
//       disneyVideos,
//       watchItAgainVideos,
//       travelVideos,
//       productivityVideos,
//       popularVideos,
//     },
//   };
// }

export default function Home(
  {
    // disneyVideos,
    // watchItAgainVideos,
    // travelVideos,
    // productivityVideos,
    // popularVideos,
  }
) {
  // }: HomeProps) {
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
          itemId="4zH5iYM4wJo"
          title="Clifford - the red dog"
          subtitle="an extremely cute dog"
          imgUrl="/static/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="Disney"
            size="large"
            // videos={disneyVideos}
            videos={[]}
            shouldWrap={false}
            shouldScale={false}
          />
          <SectionCards
            title="Watch it again"
            // videos={watchItAgainVideos}
            videos={[]}
            size="small"
            shouldWrap={false}
            shouldScale={false}
          />
          <SectionCards
            title="Travel"
            // videos={travelVideos}
            videos={[]}
            size="small"
            shouldWrap={false}
            shouldScale={false}
          />
          <SectionCards
            title="Productivity"
            // videos={productivityVideos}
            videos={[]}
            size="medium"
            shouldWrap={false}
            shouldScale={false}
          />
          <SectionCards
            title="Popular"
            // videos={popularVideos}
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
