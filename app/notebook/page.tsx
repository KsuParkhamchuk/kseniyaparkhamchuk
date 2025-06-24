import React, { Suspense } from 'react';
import ArticleCard from '../_components/articleCard/ArticleCard';
import styles from './page.module.css';
import { Note } from './types';

async function getNoteList(): Promise<Note[]> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/'}api/notebook`;
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } });

    if (!response.ok) {
        throw new Error('Failed to fetch notes from the API.');
    }

    return response.json();
}

export default async function NotebookPage() {
    const noteList = await getNoteList();

    return (
        <div className={styles.notebookContainer}>
            <h2 className={styles.notebookTitle}>ML Intuition Notebook</h2>
            <p className={styles.notebookText}>These are the notes I took in attempts to learn something</p>
            
            <Suspense fallback={<div>Loading...</div>}>
                <div className={styles.articlesContainer}>
                    {noteList && noteList.length > 0 ? (
                        noteList.reverse().map((note: Note) => (
                            <React.Fragment key={note._id.toString()}>
                                <ArticleCard 
                                    id={note._id.toString()}
                                    title={note.title}
                                    imagePath={note.imagePath}
                                    description={note.description}
                                    parts={note.parts}
                                    createdAt={note.createdAt}
                                />
                                <div className={styles.divider}></div>
                            </React.Fragment>
                        ))
                    ) : (
                        <div className={styles.notebookText}>There are no notes yet</div>
                    )}
                </div>
            </Suspense>
        </div>
    );
}