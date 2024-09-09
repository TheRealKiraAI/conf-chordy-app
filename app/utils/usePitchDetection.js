import { useEffect, useState } from "react";
import { freqToMidi, startAudioContext } from "./audioUtils";

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
    };

    setup();
  }, []);

  /*
   *  name: startPitch is a function that takes in the stream and audioContext and calls the pitchDetection function
   * input: stream, audioContext
   */

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
