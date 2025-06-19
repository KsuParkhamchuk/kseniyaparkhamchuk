'use client'

import React, { useEffect, useState } from 'react';
import ArticleCard from '../_components/articleCard/ArticleCard';
import styles from './page.module.css';
import { Note } from './types';
import { useNote } from '../context/noteContext';

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
                {noteList.length ? noteList.reverse().map((note: Note) => (
                    <>
                        <ArticleCard 
                            key={note._id.toString()}
                            id={note._id.toString()}
                            title={note.title}
                            imagePath={note.imagePath}
                            description={note.description}
                            parts={note.parts}
                            createdAt={note.createdAt}
                        />
                        <div className={styles.divider}></div>
                    </>
                )) : <div className={styles.notebookText}>There are no notes yet</div>}
            </div>
        </div>
    );
}