"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 2 seconds
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        color: "white",
        fontFamily: "var(--font-jetbrains-mono)",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#40e0d0", fontSize: "3rem", marginBottom: "20px" }}>
        Page Not Found
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
        Redirecting to home page...
      </p>
      <a
        href="/"
        style={{
          color: "#40e0d0",
          textDecoration: "underline",
          fontSize: "1.1rem",
        }}
      >
        Click here if not redirected automatically
      </a>
    </div>
  );
}
