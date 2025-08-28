import { Suspense } from "react";
import { getThoughtById } from "../data";
import ReactMarkdown from "react-markdown";

interface ThoughtPageProps {
  params: Promise<{ id: string }>;
}

export default async function ThoughtPage({ params }: ThoughtPageProps) {
  const { id } = await params;

  const thought = await getThoughtById(id);

  return (
    <Suspense fallback="Loading...">
      <h1>{thought?.title}</h1>
      <ReactMarkdown>{thought?.content}</ReactMarkdown>
    </Suspense>
  );
}
