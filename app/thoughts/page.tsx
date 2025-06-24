import { Suspense } from 'react';
import styles from './page.module.css';
import { Thought } from './types'


const getThoughts = async (): Promise<Thought[]> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/'}api/thoughts`

    const response = await fetch(url, {next: {revalidate: 3600}})

    if (!response.ok) {
        throw new Error("Failed to fetch thoughts from the API")
    }

    return response.json()
}

export default async function ThoughtsPage() {
    const thoughts = await getThoughts()
    
    return (
        <div>
            <h2 className={styles.title}>Thoughts</h2>
            <Suspense fallback="Loading">
                {thoughts.map((thought: Thought) => {
                    return <div key={thought._id.toString()}>
                        <h2>{thought.title}</h2>
                        <p>{thought.description}</p>
                        <p>{thought.content}</p>
                        <p>{thought.imagePath}</p>
                    </div>
                })}
            </Suspense>
        </div>
    )
}

  