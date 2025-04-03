import React from 'react';
import ArticleCard from '../components/ArticleCard';
import styles from './page.module.css';

export default function NotebookPage() {
    const articles = [
        {
            id: 'shape-of-everything-inside-transformer',
            title: 'Shape of everything inside a transformer',
            imagePath: '/notebook/notebook-shape.jpg',
            content: 'While learning about GPT-2 architecture I constantly come across the same issue - shapes, dimensions and every further problems related to that. The purpose of this article is to go through the whole GPT model and thoroughly think of any dimension and its purpose',
            parts: []
        },
        {
            id: 'everything-about-tokenization',
            title: 'Everything about tokenization',
            imagePath: '/notebook/notebook-tokenizer.jpg',
            content: '',
            parts: [
                { number: 1, title: 'Beginners understanding' },
                { number: 2, title: 'Tokenizer types' }
            ]
        },
        {
            id: 'vibe-coding-notes',
            title: '"Vibe coding" notes',
            imagePath: '/notebook/notebook-vibe.jpg',
            content: 'Everyone wonders how the world is going to look like after emerging of LLMs.\nMy main goal was to check how good LLM can follow instructions, how well can make tech decisions, what are the main limitations and what is a human part in such type of coding.'
        }
    ];

    return (
        <div className={styles.notebookContainer}>
            <h2 className={styles.notebookTitle}>ML Intuition Notebook</h2>
            <p className={styles.notebookIntro}>These are the notes I took in attempts to learn something</p>
            
            <div className={styles.articlesContainer}>
                {articles.map((article) => (
                    <>
                        <ArticleCard 
                            key={article.id}
                            id={article.id}
                            title={article.title}
                            imagePath={article.imagePath}
                            content={article.content}
                            parts={article.parts}
                        />
                        <div className={styles.divider}></div>
                    </>
                ))}
            </div>
        </div>
    );
}