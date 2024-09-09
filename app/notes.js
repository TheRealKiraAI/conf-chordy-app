"use client";

import dynamic from "next/dynamic";
import React from "react";

import usePitchDetection from "./utils/usePitchDetection";

const Canvas = dynamic(() => import("./canvas"), {
  ssr: false,
});

const Notes = () => {
  const detectedNote = usePitchDetection();

  return (
    <div>
      <p>Detected Note: {detectedNote}</p>
      <Canvas note={detectedNote} />
    </div>
  );
};

export default Notes;
