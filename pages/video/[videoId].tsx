import { useRouter } from "next/router";
import { Navbar } from "../../components/Navbar/Navbar";
import styles from "../../styles/Video.module.css";
import Modal from "react-modal";
import clsx from "clsx";
import { GetStaticProps, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { fetchVideoById } from "../../lib/videos";
import { formatBigNumber, formatDate } from "../../helpers/format";
import { Video } from "../../components/SectionCards/SectionCards.props";

Modal.setAppElement("#__next");

export interface VideoObj {
  video: Video;
}

export const getStaticProps: GetStaticProps<
  { [key: string]: any },
  ParsedUrlQuery,
  PreviewData
> = async (context) => {
  const videoId = context?.params?.videoId as string;
  const videoArray = await fetchVideoById(videoId);

  return {
    props: { video: videoArray.length > 0 ? videoArray[0] : {} },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos.map((videoId) => ({ params: { videoId } }));

  return { paths, fallback: "blocking" };
};

const Video = ({ video }: VideoObj) => {
  const router = useRouter();
  const videoId = router.query.videoId;

  const {
    title,
    publishedAt,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  return (
    <>
      <Navbar />
      <Modal
        className={styles.videoModal}
        overlayClassName={styles.videoOverlay}
        contentLabel="Watch the video"
        isOpen={true}
        onRequestClose={() => router.back()}
      >
        <iframe
          id="ytPlayer"
          className={styles.videoPlayer}
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=1&rel=0`}
        ></iframe>

        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button>
              <div className={styles.btnWrapper}></div>
            </button>
          </div>
          <button>
            <div className={styles.btnWrapper}></div>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <hr />
              <p className={styles.videoTitle}>{title}</p>
              <p className={styles.videoDescription}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.subTextColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.subTextColor}>View Count: </span>
                <span className={styles.channelTitle}>
                  {formatBigNumber(viewCount)}
                </span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.subTextColor}>Published at: </span>
                <span className={styles.channelTitle}>
                  {formatDate(publishedAt)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Video;
