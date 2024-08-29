"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import { freqToMidi, startAudioContext } from "./utils/audioUtils";
import pitchDetection from "./utils/pitchDetection";
import styles from "./page.module.css";

// import canvas with SSR false to disable server-side rendering
const Canvas = dynamic(() => import("./canvas"), {
  ssr: false,
});

let audioContext;
let pitch;
let stream;
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const Notes = () => {
  const [detectedNote, setDetectedNote] = useState(""); // add use state to update current note values

  useEffect(() => {
    const setup = async () => {
      audioContext = new AudioContext();
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      startPitch(stream, audioContext);
    };

    setup();
  }, []);

  const startPitch = (stream, audioContext) => {
    startAudioContext(audioContext); // uses our helper function for audio input
    if (audioContext) {
      pitch = pitchDetection("./model/", audioContext, stream, modelLoaded);
    } else {
      console.log("AudioContext or mic not initialized.");
    }
  };

  const modelLoaded = () => {
    getPitch();
  };

  const getPitch = () => {
    // get pitch from ml5 library
    pitch.getPitch(function (err, frequency) {
      if (frequency) {
        let midiNum = freqToMidi(frequency);
        const note = scale[midiNum % 12];
        setDetectedNote(note);
      }
      getPitch(); // continue detecting pitches
    });
  };

  return (
    <div className={styles.main}>
      <p>Detected Note: {detectedNote}</p>
      <Canvas note={detectedNote} />
    </div>
  );
};

export default Notes;
