"use client";

import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const AboutSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <motion.section
      ref={ref}
      id="about"
      className="py-5 min-vh-100 d-flex align-items-center"
      style={{
        background: "rgba(22, 33, 62, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 68, 68, 0.2)",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Container fluid className="px-4">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center mb-5">
            <motion.h2
              className="display-3 fw-bold"
              style={{
                color: "var(--primary-cyan)",
                textShadow: "0 0 20px rgba(64, 224, 208, 0.3)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={8}>
            <motion.div
              className="about-text border p-5"
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                borderColor: "var(--primary-cyan)",
                borderWidth: "2px",
                fontSize: "1.3rem",
                lineHeight: "1.8",
                color: "#f0f0f0",
                minHeight: "400px",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.p
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Hello! My name is Joseph Vazquez, and I'm currently pursuing a
                Bachelor's degree in Computer Science at California State
                University, Los Angeles (Cal State LA).
              </motion.p>

              <motion.p
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                I'm passionate about technology and actively involved on campus
                as the Web Master for the Association for Computing Machinery
                (ACM). I'm also working toward earning the Google Cybersecurity
                Professional Certificate while continuously improving my
                personal website with new features and projects.
              </motion.p>

              <motion.p
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                My career interests and experience span across software
                engineering, cybersecurity, web development, and IT. I'm
                currently seeking internship opportunities in any of these areas
                to gain hands-on experience and to grow professionally.
              </motion.p>

              <motion.p
                className="mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Feel free to explore my website, check out my LinkedIn or
                GitHub, and if you'd like to connect, just use the contact
                button at the very top of the page. Thanks for reading and
                stopping by!
              </motion.p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
