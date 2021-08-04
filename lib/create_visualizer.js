class Visualizer {

  constructor(analyser, canvas) {
    this.bufferSize = analyser.frequencyBinCount;
    this.bufferData = new Uint8Array(bufferSize)
    this.canvas = canvas;
    this.canvas.clearRect(0, 0, canvas.width, canvas.height)
  }

  start() {
    drawVisual = requestAnimationFrame(drawAlt);

    this.analyser.getByteFrequencyData(bufferData);

    this.canvas.fillStyle = 'rgb(0, 0, 0)';
    this.canvas.fillRect(0, 0, canvas.width, canvas.height);

    var barWidth = (canvas.width / bufferSize) * 2.5;
    var x = 0;

    bufferData.forEach(data => {

      this.canvas.fillStyle = 'rgb(255,50,50)';
      this.canvas.fillRect(x,canvas.height-data/2,barWidth,data/2);

      x += barWidth + 1;
    })
  }
}