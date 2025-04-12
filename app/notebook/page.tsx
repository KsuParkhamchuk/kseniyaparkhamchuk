'use client'

import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import styles from './page.module.css';
import { Note } from './types';
import { useNote } from '../context/noteContext';
// const articles = [
//     {
//         id: 'shape-of-everything-inside-transformer',
//         title: 'Shape of everything inside a transformer',
//         imagePath: '/notebook/notebook-shape.jpg',
//         content: 'While learning about GPT-2 architecture I constantly come across the same issue - shapes, dimensions and every further problems related to that. The purpose of this article is to go through the whole GPT model and thoroughly think of any dimension and its purpose',
//         parts: []
//     },
//     {
//         id: 'everything-about-tokenization',
//         title: 'Everything about tokenization',
//         imagePath: '/notebook/notebook-tokenizer.jpg',
//         content: '',
//         parts: [
//             { number: 1, title: 'Beginners understanding' },
//             { number: 2, title: 'Tokenizer types' }
//         ]
//     },
// ];

export default function NotebookPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const {noteList, setNoteList} = useNote();

    useEffect(() => {
        if (noteList.length) {
            return;
        }

        setIsLoading(true);
        fetch('/api/notebook')
        .then(response => response.json())
        .then(data => {
            setNoteList(data);
            setIsLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    }, [setNoteList, noteList.length])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.notebookContainer}>
            <h2 className={styles.notebookTitle}>ML Intuition Notebook</h2>
            <p className={styles.notebookText}>These are the notes I took in attempts to learn something</p>
            
            <div className={styles.articlesContainer}>
                {noteList.length ? noteList.map((note: Note) => (
                    <>
                        <ArticleCard 
                            key={note._id.toString()}
                            id={note._id.toString()}
                            title={note.title}
                            imagePath={note.imagePath}
                            description={note.description}
                            parts={note.parts}
                        />
                        <div className={styles.divider}></div>
                    </>
                )) : <div className={styles.notebookText}>There are no notes yet</div>}
            </div>
        </div>
    );
}