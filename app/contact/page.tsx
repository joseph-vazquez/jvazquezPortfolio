"use client";

import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaCopy, FaEnvelope } from "react-icons/fa";

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showManualContact, setShowManualContact] = useState(false);
  const [formattedMessage, setFormattedMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createFormattedMessage = (): string => {
    return `Name: ${formData.name}
Company: ${formData.company || "Not specified"}
Phone: ${formData.phone || "Not provided"}
Email: ${formData.email}

Message:
${formData.message}

---
Sent from Joseph Vazquez Portfolio Contact Form`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const formatted = createFormattedMessage();
    setFormattedMessage(formatted);

    const subject = `Portfolio Contact Form - ${formData.name}`;
    const mailtoLink = `mailto:josephvwork04@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(formatted)}`;

    try {
      window.location.href = mailtoLink;
      setShowSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          company: "",
          phone: "",
          email: "",
          message: "",
        });
      }, 1000);
    } catch (error) {
      console.error("Error opening email client:", error);
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const handleCopyMessage = () => {
    if (!validateForm()) return;

    const formatted = createFormattedMessage();
    setFormattedMessage(formatted);
    setShowManualContact(true);
    setShowSuccess(true);
  };

  const copyToClipboard = (text: string, type: "email" | "message") => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(
          `${
            type === "email" ? "Email address" : "Message"
          } copied to clipboard!`
        );
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert(
          `${
            type === "email" ? "Email address" : "Message"
          } copied to clipboard!`
        );
      });
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Home Button */}
      <div
        className="position-fixed"
        style={{ top: "30px", left: "30px", zIndex: 1000 }}
      >
        <Link href="/" passHref>
          <Button
            className="d-flex align-items-center gap-2"
            style={{
              background: "var(--primary-cyan)",
              color: "#000",
              border: "none",
              padding: "12px 20px",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textDecoration: "none",
              borderRadius: "0", // Remove rounding
              transform: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#60fff0";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 10px 20px rgba(64, 224, 208, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--primary-cyan)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FaArrowLeft /> Home
          </Button>
        </Link>
      </div>

      <Container fluid className="flex-grow-1 d-flex align-items-center py-5">
        <Row className="justify-content-center w-100">
          <Col xs={12} lg={8} xl={6}>
            <motion.div
              className="contact-container p-5"
              style={{
                background: "rgba(26, 26, 46, 0.9)",
                backdropFilter: "blur(15px)",
                border: "3px solid var(--primary-cyan)", // Thicker border
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                marginTop: "80px",
                borderRadius: "0", // Remove rounding
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-center mb-4"
                style={{
                  fontSize: "3rem",
                  color: "var(--primary-cyan)",
                  textShadow: "0 0 20px rgba(64, 224, 208, 0.3)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Get In Touch
              </motion.h1>

              {showSuccess && (
                <Alert
                  variant="success"
                  className="mb-4"
                  style={{
                    background: "rgba(64, 224, 208, 0.1)",
                    borderColor: "var(--primary-cyan)",
                    color: "var(--primary-cyan)",
                  }}
                >
                  {showManualContact
                    ? "Your message has been formatted below. Copy the email address and message to send manually."
                    : "Thank you for your message! I'll get back to you as soon as possible."}
                </Alert>
              )}

              {!showManualContact && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label
                            style={{
                              color: "var(--primary-cyan)",
                              fontWeight: "bold",
                            }}
                          >
                            Name{" "}
                            <span style={{ color: "var(--primary-red)" }}>
                              *
                            </span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your Name"
                            isInvalid={!!errors.name}
                            style={{
                              background: "rgba(0, 0, 0, 0.5)",
                              border: "2px solid #666", // Thicker and brighter border
                              color: "white",
                              fontFamily: "var(--font-jetbrains-mono)",
                              borderRadius: "0", // Remove rounding
                            }}
                            className="custom-input"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label
                            style={{
                              color: "var(--primary-cyan)",
                              fontWeight: "bold",
                            }}
                          >
                            Company
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your Company Name"
                            style={{
                              background: "rgba(0, 0, 0, 0.5)",
                              border: "2px solid #666",
                              color: "white",
                              fontFamily: "var(--font-jetbrains-mono)",
                              borderRadius: "0",
                            }}
                            className="custom-input"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label
                            style={{
                              color: "var(--primary-cyan)",
                              fontWeight: "bold",
                            }}
                          >
                            Phone Number
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Your Phone Number"
                            style={{
                              background: "rgba(0, 0, 0, 0.5)",
                              border: "2px solid #666",
                              color: "white",
                              fontFamily: "var(--font-jetbrains-mono)",
                              borderRadius: "0",
                            }}
                            className="custom-input"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label
                            style={{
                              color: "var(--primary-cyan)",
                              fontWeight: "bold",
                            }}
                          >
                            Email{" "}
                            <span style={{ color: "var(--primary-red)" }}>
                              *
                            </span>
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Your Email"
                            isInvalid={!!errors.email}
                            style={{
                              background: "rgba(0, 0, 0, 0.5)",
                              border: "2px solid #666",
                              color: "white",
                              fontFamily: "var(--font-jetbrains-mono)",
                              borderRadius: "0",
                            }}
                            className="custom-input"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label
                            style={{
                              color: "var(--primary-cyan)",
                              fontWeight: "bold",
                            }}
                          >
                            Message{" "}
                            <span style={{ color: "var(--primary-red)" }}>
                              *
                            </span>
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Your Message"
                            isInvalid={!!errors.message}
                            style={{
                              background: "rgba(0, 0, 0, 0.5)",
                              border: "2px solid #666",
                              color: "white",
                              fontFamily: "var(--font-jetbrains-mono)",
                              resize: "vertical",
                              borderRadius: "0",
                            }}
                            className="custom-input"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="text-center mt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        size="lg"
                        style={{
                          background: "var(--primary-cyan)",
                          color: "#000",
                          border: "none",
                          padding: "18px 40px",
                          fontFamily: "var(--font-jetbrains-mono)",
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          minWidth: "250px",
                          borderRadius: "0", // Remove rounding
                        }}
                        onMouseEnter={(e) => {
                          if (!isSubmitting) {
                            e.currentTarget.style.backgroundColor = "#60fff0";
                            e.currentTarget.style.transform =
                              "translateY(-3px)";
                            e.currentTarget.style.boxShadow =
                              "0 15px 30px rgba(64, 224, 208, 0.4)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSubmitting) {
                            e.currentTarget.style.backgroundColor =
                              "var(--primary-cyan)";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                          }
                        }}
                      >
                        <FaEnvelope className="me-2" />
                        {isSubmitting
                          ? "Opening Email..."
                          : "Send via Email Client"}
                      </Button>

                      <div className="my-3">
                        <span style={{ color: "#ccc", fontSize: "1.1rem" }}>
                          or
                        </span>
                      </div>

                      <Button
                        type="button"
                        onClick={handleCopyMessage}
                        size="lg"
                        style={{
                          background: "var(--primary-red)",
                          color: "white",
                          border: "none",
                          padding: "18px 40px",
                          fontFamily: "var(--font-jetbrains-mono)",
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          minWidth: "250px",
                          borderRadius: "0", // Remove rounding
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#ff6666";
                          e.currentTarget.style.transform = "translateY(-3px)";
                          e.currentTarget.style.boxShadow =
                            "0 15px 30px rgba(255, 68, 68, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "var(--primary-red)";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <FaCopy className="me-2" />
                        Copy Message & Email
                      </Button>
                    </div>
                  </Form>
                </motion.div>
              )}

              {showManualContact && (
                <motion.div
                  className="manual-contact border p-4 mt-4"
                  style={{
                    background: "rgba(255, 68, 68, 0.1)",
                    borderColor: "var(--primary-red)",
                    borderWidth: "2px",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3
                    className="text-center mb-4"
                    style={{
                      color: "var(--primary-red)",
                      fontSize: "1.8rem",
                    }}
                  >
                    Manual Contact Information
                  </h3>

                  <div className="contact-info">
                    <p className="mb-3" style={{ fontSize: "1.1rem" }}>
                      <strong>Email:</strong> josephvwork04@gmail.com
                    </p>

                    <p className="mb-3" style={{ fontSize: "1.1rem" }}>
                      <strong>Your message has been formatted below:</strong>
                    </p>

                    <div
                      className="message-preview border p-3 mb-3"
                      style={{
                        background: "rgba(0, 0, 0, 0.5)",
                        borderColor: "#333",
                        whiteSpace: "pre-line",
                        fontSize: "0.9rem",
                        maxHeight: "200px",
                        overflowY: "auto",
                        fontFamily: "var(--font-jetbrains-mono)",
                      }}
                    >
                      {formattedMessage}
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                      <Button
                        onClick={() =>
                          copyToClipboard("josephvwork04@gmail.com", "email")
                        }
                        className="btn-primary"
                        size="sm"
                      >
                        <FaCopy className="me-1" />
                        Copy Email Address
                      </Button>

                      <Button
                        onClick={() =>
                          copyToClipboard(formattedMessage, "message")
                        }
                        className="btn-primary"
                        size="sm"
                      >
                        <FaCopy className="me-1" />
                        Copy Full Message
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
