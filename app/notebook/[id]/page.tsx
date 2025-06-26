import ReactMarkdown from "react-markdown";
import styles from "./page.module.css"
import Link from "next/link";
import { Part } from "../types";
import { ImageComponent } from "../../_components/image/ImageComponent";
import { Suspense } from "react";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getNoteById } from "../data";

interface NotebookPageProps {
    params: Promise<{ id: string }>;
}

export default async function NotebookPage({ params }: NotebookPageProps) {
    const { id } = await params
    const currentNote = await getNoteById(id);
    
    return (
        <Suspense fallback="Loading...">
            <div>
                <h1 className={styles.title}>{currentNote?.title}</h1>
                <div className={styles.content}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ img: ImageComponent }}>{currentNote?.content}</ReactMarkdown>
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
        </Suspense>
    )
}