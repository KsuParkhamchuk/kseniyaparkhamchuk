import ReactMarkdown from "react-markdown";
import styles from "./page.module.css"
import Link from "next/link";
import { Part } from "../types";
import { ImageComponent } from "../../_components/image/ImageComponent";
import { Suspense } from "react";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getNoteById } from "../data";
import type { Metadata } from 'next'

interface NotebookPageProps {
    params: { id: string };
}

export async function generateMetadata(
  { params }: NotebookPageProps,
): Promise<Metadata> {
  const id = params.id
  const note = await getNoteById(id)

  if (!note) {
    return {
      title: 'Note not found',
      description: 'The note you are looking for does not exist.',
    }
  }

  const imageUrl = note.imagePath 
    ? `https://kseniyaparkhamchuk.com${note.imagePath}` 
    : 'https://kseniyaparkhamchuk.com/default-og-image.png';

  return {
    title: note.title,
    description: note.description,
    openGraph: {
      title: note.title,
      description: note.description,
      url: `https://kseniyaparkhamchuk.com/notebook/${id}`,
      siteName: 'Kseniya Parkhamchuk',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: note.title,
      description: note.description,
      images: [imageUrl],
    },
  }
}

export default async function NotebookPage({ params }: NotebookPageProps) {
    const { id } = params
    const currentNote = await getNoteById(id);
    
    if (!currentNote) {
        return <div>Note not found.</div>;
    }

    return (
        <Suspense fallback="Loading...">
            <div>
                <h1 className={styles.title}>{currentNote.title}</h1>
                <div className={styles.content}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ img: ImageComponent }}>{currentNote.content}</ReactMarkdown>
                </div>
                {currentNote.parts && (
                    <div className={styles.parts}>
                        
                        {currentNote.parts.map((part: Part) => (
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