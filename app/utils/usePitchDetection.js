import { useEffect, useState } from "react";
import { freqToMidi, startAudioContext } from "./audioUtils";
import pitchDetection from "./pitchDetection";

const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const usePitchDetection = () => {
  const [detectedNote, setDetectedNote] = useState("");
  let audioContext;
  let pitch;
  let stream;

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
    startAudioContext(audioContext);
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
    pitch.getPitch((err, frequency) => {
      if (frequency) {
        let midiNum = freqToMidi(frequency);
        const note = scale[midiNum % 12];
        setDetectedNote(note);
      }
      getPitch();
    });
  };

  return detectedNote;
};

export default usePitchDetection;
