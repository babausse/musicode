SAMPLE_RATE = 8*1e3;
MIN_DB = -100
MAX_DB = -20

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
  const audioContext = new window.AudioContext({sampleRate: SAMPLE_RATE});

  audioContext.sampleRate.value = 24000;

  console.log(audioContext);

  let sources = sourceGrabber(audioContext);
  const gainNode = audioContext.createGain();
  const analyser = audioContext.createAnalyser();

  // Configures the analyser to be correctly displayed afterward.
  analyser.maxDecibels = MAX_DB;
  analyser.minDecibels = MIN_DB;
  analyser.smoothingTimeConstant = 0.99;
  analyser.fftSize = 4096;

  if (!Array.isArray(sources)) {
    sources = [sources]
  }

  // Connects the whole chain source -> gain -> analyser -> output
  sources.forEach(source => {
    source.connect(gainNode);
  })
  gainNode.connect(analyser);
  analyser.connect(audioContext.destination)

  return analyser;
}