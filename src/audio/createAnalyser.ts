import { FFT_SIZE, MAX_DB, MIN_DB, SMOOTHING_CONSTANT } from "../utils/constants";

export function createAnalyser(context: AudioContext, source: AudioNode): AnalyserNode {
  const gainNode = context.createGain();
  const analyser = context.createAnalyser();

  // Configures the analyser to be correctly displayed afterward.
  analyser.maxDecibels = MAX_DB;
  analyser.minDecibels = MIN_DB;
  analyser.smoothingTimeConstant = SMOOTHING_CONSTANT;
  analyser.fftSize = FFT_SIZE;

  // Connects the whole chain source -> gain -> analyser -> output
  source.connect(gainNode);
  gainNode.connect(analyser);
  gainNode.connect(context.destination)

  return analyser;
}