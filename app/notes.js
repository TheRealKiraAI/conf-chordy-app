"use client";

import dynamic from "next/dynamic";
import React from "react";

import styles from "./page.module.css";

const Canvas = dynamic(() => import("./canvas"), {
  ssr: false,
});

const Notes = () => {
  return (
    <div className={styles.main}>
      <p>Hello, Netlify Compose Conference 2024!</p>
    </div>
  );
};

export default Notes;
