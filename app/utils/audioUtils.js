/*  
 name: startAudioContext
input: none
 desc: provides user to allow for audio input on the web
*/
export function startAudioContext(audioContext) {
  if (audioContext) {
    // if the AudioContext is already created, resume it
    audioContext.resume();
  } else {
    // create and start the AudioContext from browser
    audioContext = new (window.AudioContext ||
      window.webkitAudioContext ||
      window.mozAudioContext ||
      window.oAudioContext ||
      window.msAudioContext)();
  }
}
