"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "../components/LoadingScreen";
import HeroSection from "../components/HeroSection";
import ResumeSection from "../components/ResumeSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import BackToTop from "../components/BackToTop";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const resumeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  // Parallax effect implementation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // Apply parallax to body background
      document.body.style.backgroundPosition = `${x * 40}px ${y * 20}px`;
    };

    // Add mousemove listener after content is loaded
    if (showContent) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showContent]);

  const handleLoadingComplete = () => {
    setShowContent(true);
  };

  const scrollToSection = (section: string) => {
    let targetRef;
    switch (section) {
      case "resume":
        targetRef = resumeRef;
        break;
      case "about":
        targetRef = aboutRef;
        break;
      case "projects":
        targetRef = projectsRef;
        break;
      default:
        return;
    }
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToTop = () => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {!showContent && <LoadingScreen onComplete={handleLoadingComplete} />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <HeroSection onNavigateToSection={scrollToSection} />
        <ResumeSection ref={resumeRef} />
        <AboutSection ref={aboutRef} />
        <ProjectsSection ref={projectsRef} />
        <BackToTop onScrollToTop={scrollToTop} />
      </motion.main>
    </>
  );
}
