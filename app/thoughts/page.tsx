import { Suspense } from "react";
import styles from "./page.module.css";
import { Thought as ThoughtType } from "./types";
import ArticleCard from "../_components/articleCard/ArticleCard";
import { getThoughts } from "./data";

export default async function ThoughtsPage() {
  const thoughts = await getThoughts();

  return (
    <div>
      <h2 className={styles.title}>Thoughts</h2>
      <p>
        I believe taking notes is a powerful way to establish a dialog. Not only
        with people, but rather with yourself.
      </p>
      <Suspense fallback="Loading">
        {thoughts.map((thought: ThoughtType) => {
          return (
            <ArticleCard
              key={thought._id.toString()}
              id={thought._id.toString()}
              title={thought.title}
              description={thought.description}
              imagePath={thought.imagePath}
              prefix="thoughts"
            />
          );
        })}
      </Suspense>
    </div>
  );
}
