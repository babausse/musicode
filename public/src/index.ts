import { createAnalyser } from "./audio/createAnalyser";
import { createVisualiser } from "./audio/createVisualiser";
import { getMicrophone } from "./audio/getMicrophone";
import { SAMPLE_RATE } from "./utils/constants";

getMicrophone().then(stream => {
  const context = new AudioContext({sampleRate: SAMPLE_RATE});
  const source = context.createMediaStreamSource(stream);
  const analyser = createAnalyser(context, source);
  const canvas = document.querySelector('.visualizer');

  createVisualiser(analyser, canvas);
});