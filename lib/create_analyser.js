/**
 * Creates the whole analyser from an audio source provided by the user.
 * This source might be an audio HTML tag stream, a user microphone stream,
 * an oscillator, or anything that can be plugged into the gain node.
 * 
 * @param {CallableFunction} sourceGrabber the callback used to grab the
 *   source. The audiocontext created during the lifetime of the function
 *   will be passed as first parameter.
 */
function createAnalyser(sourceGrabber) {
  // Creates the Web Audio API elements needed.
  const audioContext = new window.AudioContext();
  const source = sourceGrabber(audioContext);
  const gainNode = audioContext.createGain();
  const analyser = audioContext.createAnalyser();

  // Configures the analyser to be correctly displayed afterward.
  analyser.maxDecibels = -20;
  analyser.minDecibels = -40;
  analyser.smoothingTimeConstant = 0.5;

  // Connects the whole chain source -> gain -> analyser -> output
  source.connect(gainNode);
  gainNode.connect(analyser);
  analyser.connect(audioContext.destination)

  return analyser;
}