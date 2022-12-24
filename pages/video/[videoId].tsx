import { useRouter } from "next/router";
import { Navbar } from "../../components/Navbar/Navbar";
import styles from "../../styles/Video.module.css";
import Modal from "react-modal";
import clsx from "clsx";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();
  const videoId = router.query.videoId;

  return (
    <div className={styles.videoContainer}>
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
              <p className={styles.publishTime}>{}</p>
              <p className={styles.title}>{}</p>
              <p className={styles.description}>{}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
