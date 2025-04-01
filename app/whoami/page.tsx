import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./styles.css";
import ProjectCard from "../components/ProjectCard";

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
                            src="/meow.jpeg" 
                            alt="Cat" 
                            width={200} 
                            height={200}
                            className="cat-drawing"
                        />
                        
                        <p className="greeting">Hello! I am <strong>Kseniya</strong>. Thanks for visiting my page.</p>
                        
                        <p className="bio-text">
                        I’m a software engineer who started out building web applications—until I discovered that AI is way more exciting.
                            So now I am exploring each and every detail of machine 
                                learning. My focus and the biggest interest is <strong>NLP</strong>, 
                                <strong>transformers and their optimisations</strong>. I am also eager to 
                            learn more about <strong>human-AI collaboration</strong> and possible ways 
                            of improvement and <strong>mechanistic interpretability</strong> field.
                        </p>
                        
                        <p className="bio-text">
                            I’m not great at describing myself, so it’s best to check out what I’ve worked on instead:
                        </p>
                </div>
                    
                </div>
                <Link href="/resume.pdf" className="resume-button profile-resume-btn" target="_blank" rel="noopener noreferrer">
                        Resume
                </Link>
                
            
            <h2 className="section-title">Latest projects</h2>
            
            <div className="projects-grid">
                <ProjectCard 
                    title="Gemma3-sft"
                    description="in attempts of building custom dataset"
                    githubUrl="https://github.com/KsuParkhamchuk/gemma3-sft"
                />
                
                <ProjectCard 
                    title="GPT-2"
                    description="with custom layers implementation"
                    githubUrl="https://github.com/KsuParkhamchuk/gpt-2"
                />
                
                <ProjectCard 
                    title="Vibe-maps"
                    description="check what models are capable of"
                    githubUrl="https://github.com/KsuParkhamchuk/vibe-maps"
                />
            </div>
        </main>
    );
}