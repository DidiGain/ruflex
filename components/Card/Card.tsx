import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import styles from "./Card.module.css";
import { CardProps } from "./Card.props";

export const Card = ({ id, imgUrl, size, shouldScale = true }: CardProps) => {
  const [imageSrc, setImageSrc] = useState(imgUrl);

  const classMap: Record<string, string> = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImageSrc(
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2225&q=80"
    );
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  return (
    <div className={styles.cardContainer}>
      <motion.div className={classMap[size]} whileHover={{ ...scale }}>
        <Image
          src={imageSrc}
          alt="card image"
          className={styles.cardImage}
          fill
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
};
