"use client";

import Image from "next/image";
import styles from "./ImageComponent.module.css";
import { useEffect, useState } from "react";

export const ImageComponent = ({
  src,
  alt,
}: {
  src?: string;
  alt?: string;
}) => {
  const [isZoomedIn, setIsZoomedIn] = useState<boolean>(false);
  const [imgSrc, setSrc] = useState<string>("");

  useEffect(() => {
    async function getimgObj() {
      if (!src) {
        return null;
      }

      const response = await fetch(
        `/api/get-signed-url?srcKey=${encodeURIComponent(src)}`
      );
      const data = await response.json();
      setSrc(data.url);
    }

    getimgObj();
  }, [src]);

  const zoom = () => {
    setIsZoomedIn((prev) => !prev);
  };

  return (
    <div
      className={`image-container ${
        isZoomedIn ? styles.zoomedInContainer : styles.imageContainer
      }`}
      onClick={zoom}
    >
      {imgSrc ? (
        <Image
          priority
          width={300}
          height={0}
          sizes="100vw"
          src={imgSrc}
          alt={alt || ""}
          className={isZoomedIn ? styles.zoomedInImg : styles.image}
        />
      ) : (
        "Image loading is in progress..."
      )}
    </div>
  );
};
