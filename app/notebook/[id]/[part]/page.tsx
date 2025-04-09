'use client';

import { useNote } from "@/app/context/noteContext";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Part } from "../../types";
import styles from "./page.module.css";
import Link from "next/link";

export default function NotebookPartPage() {
    const {currentNote, getNote} = useNote();
    const paramsData = useParams();
    const partNumber = parseInt(paramsData.part as string);
    const part = currentNote?.parts?.find((part: Part) => part.number === partNumber);
    const nextPart = currentNote?.parts?.find((part: Part) => part.number === partNumber + 1);

    useEffect(() => {
        if (!currentNote) {
            fetch(`/api/notebook/${paramsData.id}`)
            .then(res => res.json())
            .then(data => {
                getNote(data[0]._id.toString());
            })
        }
    }, [currentNote, paramsData.id, getNote])
    
    return (
        <div className={styles.container}>
            <Link href={`/notebook/${currentNote?._id}`} className={`${styles.link} ${styles.back}`}>Back to &quot;{currentNote?.title}&quot;</Link>
            <h2 className={styles.title}>{part?.title}</h2>
            <div className={styles.content}>
                <ReactMarkdown>{part?.content}</ReactMarkdown>
            </div>
            {nextPart && <div className={styles.next}>
                <Link href={`/notebook/${currentNote?._id}/${nextPart?.number}`} className={`${styles.link} ${styles.next}`}>Part {nextPart?.number}: {nextPart?.title}</Link>
            </div>}
        </div>
    )
}