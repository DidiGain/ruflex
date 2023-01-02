import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import styles from "../styles/MyList.module.css";
import { Navbar } from "../components/Navbar/Navbar";
import { SectionCards } from "../components/SectionCards/SectionCards";
import { fetchMyList } from "../lib/videos";
import { getUserIdAndToken } from "../utils/getUserData";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token, userId } = await getUserIdAndToken(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const videos = await fetchMyList(token as string, userId);

  return {
    props: {
      videos,
    },
  };
}

type MyListProps = {
  videos: [];
};

const MyList = ({ videos }: MyListProps) => {
  return (
    <>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My list"
            videos={videos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </>
  );
};

export default MyList;
