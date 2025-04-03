import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
      <main>
        <div className="button-grid">
          <Link href="/whoami" className="grid-button">
            <Image 
              src="/cat.png" 
              alt="Icon for Who am I section" 
              width={800}
              height={600}
            />
            <span className="button-label">Who am I?</span>
          </Link>

          <Link href="/notebook" className="grid-button notebook-btn">
            <Image 
              src="/learn.png" 
              alt="Icon for ML Notebook section" 
              width={800}
              height={600}
            />
            <span className="button-label">ML Notebook</span>
          </Link>

          <Link href="/favourites" className="grid-button favourites-btn">
            <Image 
              src="/favourite.png" 
              alt="Icon for What I like section" 
              width={800}
              height={600}
            />
            <span className="button-label">What I like</span>
          </Link>

          <Link href="/thoughts" className="grid-button thoughts-btn">
            <Image 
              src="/ghost.png" 
              alt="Icon for What I think section" 
              width={800}
              height={600}
            />
            <span className="button-label">What I think</span>
          </Link>
        </div>

        <a href="/resume.pdf" className="resume-button" target="_blank" rel="noopener noreferrer">Resume</a>
      </main>
  );
}
