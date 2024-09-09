"use client";

import dynamic from "next/dynamic";
import React from "react";

const Canvas = dynamic(() => import("./canvas"), {
  ssr: false,
});

const Notes = () => {
  return (
    <div>
      <h1>Hello, Netlify Conf!</h1>
    </div>
  );
};

export default Notes;
