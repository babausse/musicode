// This constant represents the max possible value in the data bytes array.
const MAX_VALUE = 255
const BASELINE = 80

/**
 * Draws the sound data of the provided analyser if the provided canvas
 * so that humans can see the frequencies and volume as bars.
 * 
 * @param {*} analyser The analyser giving us the data to draw on the canvas.
 * @param {*} canvas The canvas context where the bars will be drawn
 */
function createVisualizer(analyser, canvas) {
  const canvasCtx = canvas.getContext("2d");
  const bufferSize = analyser.frequencyBinCount;
  const bufferData = new Uint8Array(bufferSize);

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  const drawAlt = function() {
    drawVisual = requestAnimationFrame(drawAlt);

    analyser.getByteFrequencyData(bufferData);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    const xRatio = (canvas.width / bufferSize) * 2.5;
    const yRatio = canvas.height / MAX_VALUE

    const p = getPeaks(bufferData, BASELINE)

    bufferData.forEach((data, idx) => {
      canvasCtx.fillStyle = getFillColor(p, idx)
      const y = (MAX_VALUE - data) *yRatio;
      canvasCtx.fillRect(idx * xRatio, y, xRatio + 1, data * yRatio);
    })
  }
  drawAlt();
}

const FREQ_GAP = 8000/4096


const NOTES = [{f:38.89, n: "Eb1"}, {f:41.2, n:"E1"}, {f: 43.65, n: "F1"}]

function closest(list, item) {
  return list.reduce(function(prev, curr) {
    return (Math.abs(curr.f - item) < Math.abs(prev.f - item) ? curr : prev);
  });
}

function updateMax(index) {
  const wrapper = document.querySelector(".frequency");
  const freq = FREQ_GAP * (index + 0.5);
  wrapper.textContent = closest(NOTES, freq).n;
}