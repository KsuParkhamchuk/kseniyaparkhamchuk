import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ArticleCard.module.css";
import { getImgSrc } from "@/app/r2/config";

interface ArticleCardProps {
  title: string;
  imagePath: string;
  description: string;
  id: string;
  prefix: string;
  parts?: { number: number; title: string }[];
  createdAt?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = async ({
  title,
  imagePath,
  description,
  id,
  prefix,
  parts,
  createdAt,
}) => {
  const dateObj = createdAt ? new Date(createdAt) : null;
  const imageSrc = await getImgSrc(imagePath);

  return (
    <Link href={`${prefix}/${id}`} className={styles.articleCard} prefetch>
      <div className={styles.articleImageContainer}>
        <Image
          src={imageSrc || ""}
          alt={`Image for ${title}`}
          width={400}
          height={300}
          className={styles.articleImage}
        />
      </div>
      <div className={styles.articleContent}>
        <div>
          <h2 className={styles.articleTitle}>{title}</h2>
          <p className={styles.articleDescription}>{description}</p>

          {parts && parts.length > 0 && (
            <ul className={styles.partsList}>
              {parts.map((part) => (
                <li key={part.number} className={styles.partItem}>
                  • Part {part.number}. {part.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.createdAtContainer}>
          <p>
            {dateObj?.toLocaleString("default", { month: "long" })}{" "}
            {dateObj?.getFullYear()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
