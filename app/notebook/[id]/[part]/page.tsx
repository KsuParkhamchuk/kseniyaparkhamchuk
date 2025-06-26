import ReactMarkdown from "react-markdown";
import { Part } from "../../types";
import styles from "./page.module.css";
import Link from "next/link";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ImageComponent } from "../../../_components/image/ImageComponent";
import { getNoteById } from "../../data";

interface NotebookPartPageProps {
    params: Promise<{ id: string; part: string }>;
}

export default async function NotebookPartPage({ params }: NotebookPartPageProps) {
    const { part, id } = await params;
    const partNumber = parseInt(part);
    const currentNote = await getNoteById(id);
    const partObj = currentNote?.parts?.find((part: Part) => part.number === partNumber);
    const nextPart = currentNote?.parts?.find((part: Part) => part.number === partNumber + 1);
    
    return (
        <div className={styles.container}>
            <Link href={`/notebook/${currentNote?._id}`} className={`${styles.link} ${styles.back}`}>Back to &quot;{currentNote?.title}&quot;</Link>
            <h2 className={styles.title}>{partObj?.title}</h2>
            <div className={styles.content}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ img: ImageComponent }}>{partObj?.content}</ReactMarkdown>
            </div>
            {nextPart && <div className={styles.next}>
                <Link href={`/notebook/${currentNote?._id}/${nextPart?.number}`} className={`${styles.link} ${styles.next}`}> Next chapter: {nextPart?.title}</Link>
            </div>}
        </div>
    )
}