import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import styles from "./Card.module.css";
import { CardProps } from "./Card.props";

export const Card = ({ id, imgUrl, size, shouldScale = true }: CardProps) => {
  const [imageSrc, setImageSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImageSrc(
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2225&q=80"
    );
  };

  return (
    <div className={styles.cardContainer}>
      <div className={classMap[size]}>
        <Image
          src={imageSrc}
          alt="card image"
          className={styles.cardImage}
          fill
          onError={handleOnError}
        />
      </div>
    </div>
  );
};
