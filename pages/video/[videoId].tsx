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
import LikeIcon from "../../components/VideoRate/like-icon";
import DislikeIcon from "../../components/VideoRate/dislike-icon";
import { useEffect, useState } from "react";

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
  const [likeBtnClicked, setLikeBtnClicked] = useState(false);
  const [dislikeBtnClicked, setDislikeBtnClicked] = useState(false);
  const router = useRouter();
  const videoId = router.query.videoId;

  const {
    title,
    publishedAt,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  useEffect(() => {
    const getLikeDislikeState = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
      });

      const data = await response.json();

      if (data.length > 0) {
        const favourited = data[0].favourited;
        if (favourited === 1) setLikeBtnClicked(true);
        else if (favourited === 0) setDislikeBtnClicked(true);
      }
    };

    getLikeDislikeState();
  }, [videoId]);

  const runRatingService = async (favourited: number) => {
    return await fetch("/api/stats", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ videoId, favourited }),
    });
  };

  const handleToggleLike = async () => {
    const val = !likeBtnClicked;
    setLikeBtnClicked(val);
    setDislikeBtnClicked(!val);

    const favourited = val ? 1 : 0;
    await runRatingService(favourited);
  };

  const handleToggleDislike = async () => {
    const val = !dislikeBtnClicked;
    setDislikeBtnClicked(val);
    setLikeBtnClicked(!val);

    const favourited = val ? 0 : 1;
    await runRatingService(favourited);
  };

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
            <button className={styles.btnWrapper} onClick={handleToggleLike}>
              <LikeIcon selected={likeBtnClicked} />
            </button>
          </div>
          <button className={styles.btnWrapper} onClick={handleToggleDislike}>
            <DislikeIcon selected={dislikeBtnClicked} />
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
