import React from "react";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl: string;
  descriptionUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  githubUrl,
}) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectCardContent}>
        <h3 className={styles.projectTitle}>{title}</h3>
        <p className={styles.projectDesc}>{description}</p>
      </div>
      <div className={styles.projectLinks}>
        <a
          href={githubUrl}
          className={`${styles.projectLink} ${styles.githubLink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check GitHub
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
