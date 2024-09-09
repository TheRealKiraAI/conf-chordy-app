import { useEffect, useState } from "react";
import { freqToMidi, startAudioContext } from "./audioUtils";

/*
 * name: pitchDetection is a function that takes in a model path, audioContext, and stream, and returns a pitchDetection object
 * input: modelPath, audioContext, stream
 */
const usePitchDetection = () => {
  const [detectedNote, setDetectedNote] = useState("");
  let audioContext;
  let pitch;
  let stream;

  /*
   * this hooks runs once when the component mounts.
   * setups up audio, requests user's microphone, and calls startPitch WHEN setup is complete
   */
  useEffect(() => {
    const setup = async () => {
      audioContext = new AudioContext();
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      // ----------> start audio <----------
    };
    setup();
  }, []);

  /*
   *  name: startPitch is a function that takes in the stream and audioContext and calls the pitchDetection function
   * input: stream, audioContext
   */
  // ----------> start pitch detection <----------

  /*
   * callback that triggers the getPitch function WHEN the model is loaded.
   */
  const modelLoaded = () => {
    getPitch();
  };

  /*
   * name: getPitch continously retrieves audio from pitch.getPitch
   * if frequency detected, it converts to a MIDI number and maps it to a note in the scale array.
   * updates the detectedNote state
   * recursive to continously check for pitch changes.
   */
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

  return detectedNote; // hook returns detected musical note, allowing components to use the detectedNote
};

export default usePitchDetection;
