import React, { useMemo } from "react";
import Link from "next/link";
import styles from "./GridBox.module.css";

interface GridBoxProps {
  title: string;
  href: string;
  external?: boolean;
  className?: string;
}

const GridBox: React.FC<GridBoxProps> = ({
  title,
  href,
  external = false,
  className,
}) => {
  const hoverColor = useMemo(() => {
    const colors = ['orange', 'blue', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);
  const content = (
    <div className={`${styles.gridBox} ${styles[hoverColor]} ${className || ''}`}>
      <h3 className={styles.boxTitle}>{title}</h3>
    </div>
  );

  if (external) {
    return (
      <a
        href={href}
        className={styles.boxLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={styles.boxLink}>
      {content}
    </Link>
  );
};

export default GridBox;
