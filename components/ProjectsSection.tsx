"use client";

import { forwardRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  thumbnail?: string; // Optional thumbnail property
  technologies: string;
  details: string;
}

const projects: Project[] = [
  {
    id: "project1",
    title: "ACM Login Page",
    description: "ACM secure admin authentication login page.",
    images: ["/images/ACM-Login-Page.JPG", "/images/ACM-Wrong-Login.JPG"],
    thumbnail: "/images/Title-ACM-Login-Page.JPG", // Separate thumbnail property
    technologies: "HTML, CSS, JavaScript, React, and Bootstrap",
    details:
      "The login page was built using HTML, CSS, JavaScript, React, and Bootstrap for responsive design. Figma was used during the planning phase to prototype the user interface and ensure consistency with the ACM organization's existing branding.",
  },
  {
    id: "project2",
    title: "More Project Cards Coming Soon!",
    description: "Here's a gallery of my past projects.",
    images: [
      "/images/ACM-Home-Page.JPG",
      "/images/PDA.JPG",
      "/images/PortfolioV1.JPG",
    ], // Gallery images only
    thumbnail: "/images/thumbNail.png", // Separate thumbnail property
    technologies: "Various Technologies",
    details:
      "ACM Home Page- I've done lots of work to keep it looking modern; Personal Schedule Tracker Program- A JavaFX program that records users schedules with date, time, and notes; Version 1 Portfolio- Only was the home page and nothing worked. Now you are looking at this on Version 6!",
  },
];

const ProjectsSection = forwardRef<HTMLElement>((props, ref) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [slideIndices, setSlideIndices] = useState<{ [key: string]: number }>(
    {}
  );

  // Initialize slide indices
  useEffect(() => {
    const initialIndices: { [key: string]: number } = {};
    projects.forEach((project) => {
      initialIndices[project.id] = 0;
    });
    setSlideIndices(initialIndices);
  }, []);

  const openModal = (projectId: string) => {
    setActiveModal(projectId);
    document.body.style.overflow = "hidden";
    // Show first slide and set active dot
    setSlideIndices((prev) => ({ ...prev, [projectId]: 0 }));
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = "auto";
  };

  const plusSlides = (n: number, projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    setSlideIndices((prev) => {
      const currentIndex = prev[projectId] || 0;
      let newIndex = currentIndex + n;

      if (newIndex >= project.images.length) newIndex = 0;
      if (newIndex < 0) newIndex = project.images.length - 1;

      return { ...prev, [projectId]: newIndex };
    });
  };

  const currentSlide = (n: number, projectId: string) => {
    setSlideIndices((prev) => ({ ...prev, [projectId]: n }));
  };

  // Handle escape key and click outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModal) {
        closeModal();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("modal")) {
        closeModal();
      }
    };

    if (activeModal) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeModal]);

  const activeProject = projects.find((p) => p.id === activeModal);
  const currentSlideIndex = activeModal ? slideIndices[activeModal] || 0 : 0;

  return (
    <>
      {/* Projects Section */}
      <motion.section
        ref={ref}
        id="projects"
        className="section projects-section"
        style={{
          background: "rgba(26, 26, 46, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(64, 224, 208, 0.2)",
          padding: "50px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          className="projects-container"
          style={{ maxWidth: "1400px", width: "100%", textAlign: "center" }}
        >
          <motion.h2
            className="section-title"
            style={{
              fontSize: "4rem",
              color: "#40e0d0",
              marginBottom: "50px",
              textShadow: "0 0 20px rgba(64, 224, 208, 0.3)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Projects
          </motion.h2>

          <div
            className="projects-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
              marginTop: "50px",
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                style={{
                  background: "rgba(0, 0, 0, 0.4)",
                  border: "2px solid #ff4444",
                  padding: "20px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  overflow: "hidden",
                  borderRadius: "0",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                onClick={() => openModal(project.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(255, 68, 68, 0.3)";
                  e.currentTarget.style.borderColor = "#40e0d0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#ff4444";
                }}
              >
                <Image
                  src={project.thumbnail || project.images[0]} // Use thumbnail if available, otherwise first image
                  alt={project.title}
                  width={400}
                  height={200}
                  className="project-image"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    marginBottom: "15px",
                  }}
                  unoptimized
                />
                <h3
                  className="project-title"
                  style={{
                    fontSize: "1.5rem",
                    color: "#40e0d0",
                    marginBottom: "10px",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="project-description"
                  style={{
                    color: "#ccc",
                    fontSize: "1rem",
                    margin: "0",
                  }}
                >
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Modal */}
      {activeModal && activeProject && (
        <div
          className="modal"
          style={{
            display: "block",
            position: "fixed",
            zIndex: 10000,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              margin: "5% auto",
              padding: "40px",
              border: "2px solid #40e0d0",
              width: "90%",
              maxWidth: "800px",
              maxHeight: "80vh",
              overflowY: "auto",
              position: "relative",
              borderRadius: "0",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="close"
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                color: "#ff4444",
                fontSize: "3rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
              onClick={closeModal}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#ff6666";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#ff4444";
              }}
            >
              &times;
            </span>

            <h2
              className="modal-title"
              style={{
                fontSize: "2.5rem",
                color: "#40e0d0",
                marginBottom: "20px",
                textShadow: "0 0 10px rgba(64, 224, 208, 0.3)",
              }}
            >
              {activeProject.id === "project2"
                ? "Project Gallery"
                : activeProject.title}
            </h2>

            <div
              className="slideshow-container"
              style={{ position: "relative", maxWidth: "100%" }}
            >
              {activeProject.images.map((image, index) => (
                <div
                  key={index}
                  className="mySlides"
                  style={{
                    display: currentSlideIndex === index ? "block" : "none",
                    textAlign: "center",
                  }}
                >
                  <Image
                    src={image}
                    alt={`${activeProject.title} screenshot ${index + 1}`}
                    width={700}
                    height={400}
                    className="modal-image"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      objectFit: "contain",
                      border: "1px solid rgba(64, 224, 208, 0.3)",
                    }}
                    unoptimized
                  />
                </div>
              ))}

              {/* Navigation arrows */}
              <button
                className="prev"
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "50%",
                  left: "0",
                  padding: "16px",
                  marginTop: "-22px",
                  color: "#40e0d0",
                  fontWeight: "bold",
                  fontSize: "2rem",
                  userSelect: "none",
                  transition: "0.3s",
                  background: "transparent",
                  border: "none",
                }}
                onClick={() => plusSlides(-1, activeProject.id)}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#ff4444";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#40e0d0";
                }}
              >
                &#10094;
              </button>

              <button
                className="next"
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  padding: "16px",
                  marginTop: "-22px",
                  color: "#40e0d0",
                  fontWeight: "bold",
                  fontSize: "2rem",
                  userSelect: "none",
                  transition: "0.3s",
                  background: "transparent",
                  border: "none",
                }}
                onClick={() => plusSlides(1, activeProject.id)}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#ff4444";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#40e0d0";
                }}
              >
                &#10095;
              </button>
            </div>

            {/* Dots navigation */}
            <div
              className="dots-container"
              style={{
                textAlign: "center",
                marginTop: "15px",
              }}
            >
              {activeProject.images.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${
                    currentSlideIndex === index ? "active" : ""
                  }`}
                  style={{
                    cursor: "pointer",
                    height: "10px",
                    width: "10px",
                    margin: "0 5px",
                    backgroundColor:
                      currentSlideIndex === index ? "#40e0d0" : "#bbb",
                    borderRadius: "50%",
                    display: "inline-block",
                    transition: "background-color 0.3s",
                    border: "none",
                  }}
                  onClick={() => currentSlide(index, activeProject.id)}
                  onMouseEnter={(e) => {
                    if (currentSlideIndex !== index) {
                      (e.target as HTMLElement).style.backgroundColor =
                        "#ff4444";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentSlideIndex !== index) {
                      (e.target as HTMLElement).style.backgroundColor = "#bbb";
                    }
                  }}
                />
              ))}
            </div>

            <div
              className="modal-description"
              style={{
                color: "#f0f0f0",
                fontSize: "1.2rem",
                lineHeight: "1.6",
                marginTop: "20px",
              }}
            >
              {activeProject.id === "project1" ? (
                <>
                  <h3 style={{ color: "#40e0d0", marginBottom: "15px" }}>
                    Technologies Used:
                  </h3>
                  <p style={{ marginBottom: "15px" }}>
                    The login page was built using{" "}
                    <strong>{activeProject.technologies}</strong> for responsive
                    design.
                    <>
                      {" "}
                      <strong>Figma</strong> was used during the planning phase
                      to prototype the user interface and ensure consistency
                      with the ACM organization's existing branding.
                    </>
                  </p>
                </>
              ) : (
                <>
                  <h3 style={{ color: "#40e0d0", marginBottom: "15px" }}>
                    The projects shown here are:
                  </h3>
                  <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
                    <li>
                      ACM Home Page- I've done lots of work to keep it looking
                      modern
                    </li>
                    <li>
                      Personal Schedule Tracker Program- A JavaFX program that
                      records users schedules with date, time, and notes
                    </li>
                    <li>
                      Version 1 Portfolio- Only was the home page and nothing
                      worked. Now you are looking at this on Version 5!
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
});

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
