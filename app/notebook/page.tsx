import React, { Suspense } from "react";
import ArticleCard from "../_components/articleCard/ArticleCard";
import styles from "./page.module.css";
import { Note } from "./types";
import { getNotes } from "./data";

export default async function NotebookPage() {
  const noteList = await getNotes();

  return (
    <div className={styles.notebookContainer}>
      <h2 className={styles.notebookTitle}>ML Intuition Notebook</h2>
      <p className={styles.notebookText}>
        These are the notes I took in attempts to learn something
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.articlesContainer}>
          {noteList && noteList.length > 0 ? (
            noteList.reverse().map((note: Note) => (
              <React.Fragment key={note._id}>
                <ArticleCard
                  id={note._id}
                  title={note.title}
                  imagePath={note.imagePath}
                  description={note.description}
                  parts={note.parts}
                  createdAt={note.createdAt}
                  prefix="notebook"
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
