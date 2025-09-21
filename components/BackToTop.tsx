"use client";

import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

interface BackToTopProps {
  onScrollToTop: () => void;
}

const BackToTop: React.FC<BackToTopProps> = ({ onScrollToTop }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when scrolled down from the home section
      if (window.scrollY > 300) {
        // Show after scrolling 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    // Check initial scroll position
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="position-fixed"
          style={{
            bottom: "30px",
            left: "30px",
            zIndex: 1000,
          }}
        >
          <Button
            onClick={onScrollToTop}
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              background: "var(--primary-cyan)",
              color: "#000",
              border: "none",
              width: "50px",
              height: "50px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#60fff0";
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 10px 20px rgba(64, 224, 208, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--primary-cyan)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
            }}
          >
            <FaArrowUp size={16} />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
