"use client";

import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SocialButtons from "./SocialButtons";

interface HeroSectionProps {
  onNavigateToSection: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToSection }) => {
  const skills = [
    "Software Engineering",
    "Cybersecurity",
    "Web Development",
    "IT",
  ];

  return (
    <section
      id="home"
      className="vh-100 d-flex align-items-center"
      style={{ paddingTop: "0", marginTop: "0" }}
    >
      <Container
        fluid
        className="px-5"
        style={{ paddingTop: "0", marginTop: "0" }}
      >
        <Row
          className="align-items-center"
          style={{ maxWidth: "1500px", margin: "0 auto", paddingTop: "0" }}
        >
          {/* Left Section */}
          <Col lg={6} className="text-start pe-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="fw-light mb-3 glow"
                style={{
                  fontSize: "11rem",
                  lineHeight: "0.9",
                  textShadow: "0 0 20px rgba(64, 224, 208, 0.3)",
                }}
              >
                Joseph
                <br />
                <strong>Vazquez</strong>
              </motion.h1>

              <motion.h2
                className="fw-light mb-5"
                style={{
                  fontSize: "3rem",
                  color: "var(--primary-cyan)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Portfolio
              </motion.h2>

              <motion.div
                className="skills-box p-3"
                style={{
                  border: "2px solid #ff4444",
                  backgroundColor: "rgba(255, 68, 68, 0.05)",
                  width: "fit-content",
                  maxWidth: "300px",
                  position: "relative",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="skill-item mb-2 position-relative ps-3"
                    style={{
                      color: "var(--primary-red)",
                      fontSize: "1.3rem",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      className="position-absolute"
                      style={{
                        left: "0",
                        color: "var(--primary-cyan)",
                      }}
                    >
                      •
                    </span>
                    {skill}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </Col>

          {/* Right Section */}
          <Col
            lg={6}
            className="text-end position-relative d-flex flex-column align-items-end justify-content-center"
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="d-flex flex-column align-items-end gap-4 position-relative w-100"
            >
              {/* Contact Button */}
              <Link href="/contact" passHref>
                <motion.button
                  className="btn"
                  style={{
                    background: "var(--primary-cyan)",
                    color: "#000",
                    border: "none",
                    padding: "15px 25px",
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "all 0.1s ease",
                    position: "relative",
                    overflow: "hidden",
                    textDecoration: "none",
                    transform: "skewX(-15deg) translateY(-2px)",
                    marginTop: "-25px",
                    borderRadius: "0",
                  }}
                  whileHover={{
                    backgroundColor: "#60fff0",
                    boxShadow: "0 10px 20px rgba(64, 224, 208, 0.3)",
                  }}
                >
                  Contact
                </motion.button>
              </Link>

              {/* Social Icons - Positioned absolutely on the right, moved higher */}
              <div
                className="position-absolute d-flex flex-column gap-3"
                style={{
                  right: "0",
                  top: "40%", // Moved up from 50% to 35%
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  paddingRight: "1px",
                }}
              >
                <SocialButtons />
              </div>

              {/* Animated GIF */}
              <motion.div
                className="gif-container"
                style={{
                  marginRight: "auto",
                  marginLeft: "25px",
                  opacity: "0.75",
                  padding: "15px 25px",
                  position: "relative",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.75, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Image
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW51dm1jMXFrd2RvMWF1eWF1cXd3bnBhY2ZuM3JxcmhkbTJ0ZjNnMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H4QUDqIVeoAViDc1S9/giphy.gif"
                  alt="Coding Animation"
                  width={350}
                  height={280}
                  unoptimized
                />
              </motion.div>

              {/* Navigation Buttons - At the bottom */}
              <motion.div
                className="d-flex gap-0 align-self-stretch mt-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {["resume", "about", "projects"].map((section) => (
                  <button
                    key={section}
                    className="nav-custom-btn flex-fill"
                    onClick={() => onNavigateToSection(section)}
                    style={{
                      textTransform: "capitalize",
                      borderRadius: "0",
                    }}
                  >
                    {section}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
