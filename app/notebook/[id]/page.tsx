import ReactMarkdown from "react-markdown";
import styles from "./page.module.css"
import Link from "next/link";
import { Part, Note } from "../types";
import { ImageComponent } from "../../_components/image/ImageComponent";
import { Suspense } from "react";

type Params = {
    id: string
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

export default async function NotebookPage({params}: {params: Params}) {
    console.log(params)
    const currentNote = await getNote(params.id);
    
    return (
        <Suspense fallback="Loading...">
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
        </Suspense>
    )
}