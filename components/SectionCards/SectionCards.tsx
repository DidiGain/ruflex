import clsx from "clsx";
import Link from "next/link";
import { Card } from "../Card/Card";
import styles from "./SectionCards.module.css";
import { SectionCardsProps } from "./SectionCards.props";

export const SectionCards = ({
  title,
  videos,
  size,
  shouldScale,
  shouldWrap = false,
}: SectionCardsProps) => {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.cardWrap)}>
        {videos.map((video, idx) => (
          <Link href={`/video/${video.id}`} key={video.id}>
            <Card
              id={idx}
              imgUrl={video.imgUrl}
              size={size}
              shouldScale={shouldScale}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
