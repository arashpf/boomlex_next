"use client";
import React, { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";

const LEN = 11;

export default function PhoneBoxes({ value, onChange, autoFocus = true }) {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  // Ensure the value always starts with 0 and is at most 11 chars
  const normalized = (() => {
    const digits = (value || "").replace(/\D/g, "").slice(0, LEN);
    if (digits.length === 0) return "";
    // Force leading 0
    if (digits[0] !== "0") return "0" + digits.slice(0, LEN - 1);
    return digits;
  })();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      // Delay to let the drawer finish animating
      const t = setTimeout(() => {
        inputRef.current?.focus();
        setFocused(true);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [autoFocus]);

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, LEN);
    // Force 0 prefix
    const cleaned =
      raw.length === 0 ? "" : raw[0] === "0" ? raw : "0" + raw.slice(0, LEN - 1);
    onChange(cleaned);
  };

  const handleKeyDown = (e) => {
    // Let the input handle normal editing; we just block non-digits on some keys
    if (e.key.length === 1 && !/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Box
      onClick={focusInput}
      sx={{
        position: "relative",
        cursor: "text",
        userSelect: "none",
        direction: "ltr",
        display: "flex",
        width: "100%",           // 👈 Take full width of the parent
        justifyContent: "space-between",
        gap: { xs: "2px", sm: "4px", md: "6px" }, // 👈 Responsive gaps
        my: 1.5,
      }}
    >
      {/* Hidden input capturing the real value */}
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        value={normalized}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="tel"
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: 1,
          height: 1,
          border: "none",
          padding: 0,
        }}
        aria-label="شماره موبایل"
      />

      {/* The 11 visual boxes */}
      {Array.from({ length: LEN }).map((_, i) => {
        const char = normalized[i] || "";
        const isFilled = !!char;
        const isActive = focused && i === normalized.length;

        return (
          <Box
            key={i}
            sx={{
              flex: 1,             // 👈 All boxes share the remaining width equally
              minWidth: 0,         // 👈 Crucial: allows flex items to shrink below content size
              height: { xs: 40, sm: 46, md: 50 }, // 👈 Fixed height for consistent roundness
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px", // 👈 Round corners as requested
              border: "1.5px solid",
              borderColor: isActive
                ? "#7a97ff"
                : isFilled
                ? "#ccc"
                : "#e0e0e0",
              backgroundColor: "#fff",
              fontSize: { xs: 16, sm: 18, md: 20 },
              fontWeight: 600,
              fontFamily: "iransans, Arial, sans-serif",
              color: "#222",
              position: "relative",
              transition: "border-color 0.15s ease, box-shadow 0.15s ease",
              boxShadow: isActive
                ? "0 0 0 3px rgba(122, 151, 255, 0.12)"
                : "none",
            }}
          >
            {isActive ? (
              // Blinking cursor when this is the "next" box to fill
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "1.5px",
                  height: { xs: 16, sm: 20, md: 22 },
                  backgroundColor: "#7a97ff",
                  animation: "phoneCursorBlink 1s steps(2, start) infinite",
                  "@keyframes phoneCursorBlink": {
                    to: { visibility: "hidden" },
                  },
                }}
              />
            ) : (
              char || ""
            )}
          </Box>
        );
      })}
    </Box>
  );
}