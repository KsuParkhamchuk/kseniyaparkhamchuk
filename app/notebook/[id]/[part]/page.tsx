import ReactMarkdown from "react-markdown";
import { Part } from "../../types";
import styles from "./page.module.css";
import Link from "next/link";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ImageComponent } from "../../../_components/image/ImageComponent";
import { getNoteById } from "../../data";
import type { Metadata } from 'next';

interface NotebookPartPageProps {
    params: { id: string; part: string };
}

export async function generateMetadata(
  { params }: NotebookPartPageProps,
): Promise<Metadata> {
  const { id, part } = params;
  const note = await getNoteById(id);
  const partNumber = parseInt(part, 10);
  const partObj = note?.parts?.find((p: Part) => p.number === partNumber);

  if (!note || !partObj) {
    return {
      title: 'Part not found',
      description: 'The article part you are looking for does not exist.',
    }
  }

  const imageUrl = note.imagePath 
    ? `https://kseniyaparkhamchuk.com${note.imagePath}` 
    : 'https://kseniyaparkhamchuk.com/default-og-image.png';

  return {
    title: `Part ${partObj.number}: ${partObj.title} | ${note.title}`,
    description: note.description,
    openGraph: {
      title: `Part ${partObj.number}: ${partObj.title} | ${note.title}`,
      description: note.description,
      url: `https://kseniyaparkhamchuk.com/notebook/${id}/${part}`,
      siteName: 'Kseniya Parkhamchuk',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: note.title }],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Part ${partObj.number}: ${partObj.title} | ${note.title}`,
      description: note.description,
      images: [imageUrl],
    },
  }
}

export default async function NotebookPartPage({ params }: NotebookPartPageProps) {
    const { part, id } = params;
    const partNumber = parseInt(part, 10);
    const currentNote = await getNoteById(id);
    
    if (!currentNote) {
        return <div>Note not found.</div>;
    }

    const partObj = currentNote.parts?.find((p: Part) => p.number === partNumber);
    const nextPart = currentNote.parts?.find((p: Part) => p.number === partNumber + 1);

    if (!partObj) {
        return <div>Part not found.</div>;
    }
    
    return (
        <div className={styles.container}>
            <Link href={`/notebook/${currentNote._id}`} className={`${styles.link} ${styles.back}`}>Back to &quot;{currentNote.title}&quot;</Link>
            <h2 className={styles.title}>{partObj.title}</h2>
            <div className={styles.content}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ img: ImageComponent }}>{partObj.content}</ReactMarkdown>
            </div>
            {nextPart && (
                <div className={styles.next}>
                    <Link href={`/notebook/${currentNote._id}/${nextPart.number}`} className={`${styles.link} ${styles.next}`}> Next chapter: {nextPart.title}</Link>
                </div>
            )}
        </div>
    )
}