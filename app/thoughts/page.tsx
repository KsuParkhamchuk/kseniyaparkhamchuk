import { Suspense } from 'react';
import styles from './page.module.css';
import { Thought as ThoughtType } from './types'
import dbConnect from '@/db/connect';
import Thought from '@/db/thoughts';


const getThoughts = async (): Promise<ThoughtType[]> => {
    await dbConnect()

     try {
        const thoughts = await Thought.find().lean();
        return JSON.parse(JSON.stringify(thoughts)) as ThoughtType[];
    } catch(error){
        console.log(error);
        return [];
    }
}

export default async function ThoughtsPage() {
    const thoughts = await getThoughts()
    
    return (
        <div>
            <h2 className={styles.title}>Thoughts</h2>
            <Suspense fallback="Loading">
                {thoughts.map((thought: ThoughtType) => {
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

  