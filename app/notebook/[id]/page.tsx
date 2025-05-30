'use client';

import { useEffect} from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import styles from "./page.module.css"
import Link from "next/link";
import { Part } from "../types";
import { useNote } from "@/app/context/noteContext";
import Image from "next/image";

const ImageComponent = ({ src, alt }: { src?: string; alt?: string }) => {
    if (!src) {
        return null;
    }

    return (
      <Image
        fill
        src={src}
        alt={alt || ''} 
        loading="lazy"
        style={{ maxWidth: '100%', height: 'auto' }} 
      />
    );
  };

export default function NotebookPage() {
    const paramsData = useParams();
    const {currentNote, getNote} = useNote();

    useEffect(() => {
        if (paramsData.id && currentNote?._id.toString() !== paramsData.id) {
            getNote(paramsData.id as string);
        }
    }, [paramsData.id, getNote, currentNote?._id])
    
    return (
        <div>
            <h1 className={styles.title}>{currentNote?.title}</h1>
            <div className={styles.content}>
                <ReactMarkdown components={{ img: ImageComponent }}>{currentNote?.content}</ReactMarkdown>
            </div>
            {currentNote?.parts && (
                <div className={styles.parts}>
                    
                    {currentNote?.parts.map((part: Part) => (
                        <Link href={`/notebook/${currentNote._id}/${part.number}`} className={styles.part} key={part.number}>
                            Part {part.number}: {part.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}