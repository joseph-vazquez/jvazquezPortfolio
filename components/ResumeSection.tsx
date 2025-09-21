"use client";

import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const ResumeSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <motion.section
      ref={ref}
      id="resume"
      className="py-5 min-vh-100 d-flex align-items-center"
      style={{
        background: "rgba(26, 26, 46, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(64, 224, 208, 0.2)",
        paddingTop: "150px", // Extra space from nav bar
        marginTop: "100px", // Additional spacing
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
                fontSize: "4rem",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Resume
            </motion.h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={8}>
            <motion.div
              className="pdf-viewer"
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                border: "3px solid #ff4444", // Bright red border
                height: "100vh", // Full viewport height
                minHeight: "800px", // Larger minimum height
                overflow: "hidden",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <iframe
                src="/documents/Joseph-A-Vazquez-Resume.pdf"
                className="w-100 h-100"
                style={{ border: "none" }}
                title="Joseph Vazquez Resume"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
});

ResumeSection.displayName = "ResumeSection";

export default ResumeSection;
