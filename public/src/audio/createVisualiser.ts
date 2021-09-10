import { BASELINE, MAX_VALUE } from "../utils/constants";
import { getFillColor } from "../utils/getFillColor";
import { getPeaks } from "../utils/getPeaks";

/**
 * Draws the sound data of the provided analyser if the provided canvas
 * so that humans can see the frequencies and volume as bars.
 * 
 * @param {*} analyser The analyser giving us the data to draw on the canvas.
 * @param {*} canvas The canvas context where the bars will be drawn
 */
export function createVisualiser(analyser, canvas) {
  const canvasCtx = canvas.getContext("2d");
  const bufferSize = analyser.frequencyBinCount;
  const bufferData = new Uint8Array(bufferSize);

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  const drawAlt = function() {
    let drawVisual = requestAnimationFrame(drawAlt);

    analyser.getByteFrequencyData(bufferData);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    const xRatio = (canvas.width / bufferSize) * 2.5;
    const yRatio = canvas.height / MAX_VALUE;
    
    const p = getPeaks(bufferData, BASELINE)

    bufferData.forEach((data, idx) => {
      canvasCtx.fillStyle = getFillColor(idx, p)
      const y = (MAX_VALUE - data) *yRatio;
      canvasCtx.fillRect(idx * xRatio, y, xRatio + 1, data * yRatio);
    })
  }
  drawAlt();
}

