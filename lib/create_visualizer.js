class Visualizer {

  constructor(analyser, canvas) {
    this.analyser = analyser;
    this.bufferSize = analyser.frequencyBinCount;
    this.bufferData = new Uint8Array(this.bufferSize)
    this.canvas = canvas;
    this.canvas.clearRect(0, 0, canvas.width, canvas.height)
  }

  start() {
    this.analyser.getByteFrequencyData(this.bufferData);

    this.canvas.fillStyle = 'rgb(0, 0, 0)';
    this.canvas.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const barWidth = (this.canvas.width / this.bufferSize) * 2.5;

    console.log(this.bufferData)

    this.bufferData.forEach((data, index) => {
      const x = index * (barWidth + 1)
      this.canvas.fillStyle = 'rgb(255,50,50)';
      this.canvas.fillRect(x,this.canvas.height-data/2,barWidth,data/2);
    })
  }
}