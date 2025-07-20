import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./styles.css";
import ProjectCard from "../_components/projectCard/ProjectCard";

export default function WhoAmIPage() {
  return (
    <main className="who-am-i-container">
      <h1 className="page-title">Who am I?</h1>
      <div className="profile-container">
        <Image
          src="/me.png"
          alt="Kseniya Parkhamchuk"
          width={300}
          height={400}
          className="profile-image"
        />
        <div className="profile-text">
          <Image
            src="/cat.png"
            alt="Cat"
            width={200}
            height={200}
            className="cat-drawing"
          />

          <p className="greeting">
            Hello! I am <strong>Kseniya</strong>.
          </p>

          <p className="bio-text">
            I’m a <strong>senior software engineer</strong> who started out building web
            applications. I still build them, but now my preferences are in
            solving interesting technical challenges alongside people who get
            equally excited about them. Recently I discovered that{" "}
            <strong>AI is super exciting</strong> in both ways: as a separate
            direction for development and in integration with excisting
            solutions. So now I am exploring each and every detail in NLP and
            LLMs. I am focusing a lot on understanding the details and thinking about
            how we can apply it for the better.
          </p>
          <p>
            I am making some notes about my findings in my{" "}
            <Link href="/notebook" className="notebook-btn">
              Blog
            </Link>
            . I am always open to talking and exchanging ideas, feel free to talk to
            me on{" "}
            <Link
              href="https://x.com/xena_pk"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </Link>
          </p>
          <p></p>
          <p className="bio-text">My latest work is below:</p>
        </div>
      </div>
      <Link
        href="/assets/Kseniya_Parkhamchuk_CV.pdf"
        className="resume-button profile-resume-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        Resume
      </Link>

      <h2 className="section-title">Latest projects</h2>

      <div className="projects-grid">
        <ProjectCard
          title="GPT-2"
          description="with custom layers implementation"
          githubUrl="https://github.com/KsuParkhamchuk/gpt-2"
        />
        <ProjectCard
          title="vLLM chat comparison"
          description="launching several vllm servers with several models on several GPUs"
          githubUrl="https://github.com/KsuParkhamchuk/vllm-mm-chat-comparison"
        />
        <ProjectCard
          title="Gemma3-sft"
          description="in attempts of building custom dataset"
          githubUrl="https://github.com/KsuParkhamchuk/gemma3-sft"
        />
      </div>
    </main>
  );
}
