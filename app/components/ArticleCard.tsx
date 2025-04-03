import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
    title: string;
    imagePath: string;
    content: string;
    id: string;
    parts?: { number: number; title: string }[];
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, imagePath, content, id, parts }) => {
    return (
        <div className={styles.articleCard}>
            <div className={styles.articleImageContainer}>
                <Image 
                    src={imagePath} 
                    alt={`Image for ${title}`} 
                    width={400}
                    height={300}
                    className={styles.articleImage}
                />
            </div>
            <div className={styles.articleContent}>
                <h2 className={styles.articleTitle}>{title}</h2>
                <p className={styles.articleDescription}>{content}</p>
                
                {parts && parts.length > 0 && (
                    <ul className={styles.partsList}>
                        {parts.map((part, index) => (
                            <li key={index} className={styles.partItem}>
                                • Part {part.number}. {part.title}
                            </li>
                        ))}
                    </ul>
                )}
                
                <div className={styles.readMoreContainer}>
                    <Link href={`/notebook/${id}`} className={styles.readMoreLink}>
                        Keep reading...
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard; 