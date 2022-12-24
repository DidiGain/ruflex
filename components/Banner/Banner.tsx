import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Banner.module.css";
import { BannerProps } from "./Banner.props";

export const Banner = ({ itemId, title, subtitle, imgUrl }: BannerProps) => {
  const router = useRouter();

  const handleBtnClick = () => {
    router.push(`/video/${itemId}`);
  };

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.leftWrapper}>
        <div className={styles.leftContent}>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subtitle}>{subtitle}</h3>
          <div className={styles.playBtnWrapper}>
            <button className={styles.playBtn} onClick={handleBtnClick}>
              <Image
                src="/static/icons/play_arrow.svg"
                alt="Play icon"
                width="32"
                height="32"
              />
              <span className={styles.playTitle}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
    </div>
  );
};
