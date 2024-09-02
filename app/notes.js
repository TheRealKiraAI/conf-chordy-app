"use client";

import dynamic from "next/dynamic";
import React from "react";

import usePitchDetection from "./utils/usePitchDetection";
import styles from "./page.module.css";

// import canvas with SSR false to disable server-side rendering
const Canvas = dynamic(() => import("./canvas"), {
  ssr: false,
});

const Notes = () => {
  const detectedNote = usePitchDetection();

  return (
    <div className={styles.main}>
      <p>Detected Note: {detectedNote}</p>
      <Canvas note={detectedNote} />
    </div>
  );
};

export default Notes;
