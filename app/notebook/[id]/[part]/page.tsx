import ReactMarkdown from "react-markdown";
import { Part, Note } from "../../types";
import styles from "./page.module.css";
import Link from "next/link";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ImageComponent } from "../../../_components/image/ImageComponent";

type Params = {
    id: string,
    part: string,
}

const getNote = async (id: string): Promise<Note | null> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/'}api/notebook/${id}`

    const response = await fetch(url, {next: {revalidate: 3600}});

    if (!response.ok) {
        throw new Error("Was not able to load the post content")
    }
    console.log(id)
    const data = await response.json();
    console.log(data)
    return data[0];
}

export default async function NotebookPartPage({params}: {params: Params}) {
    const partNumber = parseInt(params.part as string);
    const currentNote = await getNote(params.id);
    const part = currentNote?.parts?.find((part: Part) => part.number === partNumber);
    const nextPart = currentNote?.parts?.find((part: Part) => part.number === partNumber + 1);
    
    return (
        <div className={styles.container}>
            <Link href={`/notebook/${currentNote?._id}`} className={`${styles.link} ${styles.back}`}>Back to &quot;{currentNote?.title}&quot;</Link>
            <h2 className={styles.title}>{part?.title}</h2>
            <div className={styles.content}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ img: ImageComponent }}>{part?.content}</ReactMarkdown>
            </div>
            {nextPart && <div className={styles.next}>
                <Link href={`/notebook/${currentNote?._id}/${nextPart?.number}`} className={`${styles.link} ${styles.next}`}> Next chapter: {nextPart?.title}</Link>
            </div>}
        </div>
    )
}