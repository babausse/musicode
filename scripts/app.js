let heading = document.querySelector('h1');
heading.textContent = 'CLICK ANYWHERE TO START'
document.body.addEventListener('click', init);

const notes = {
  "do": 261.63,
  "re": 293.66,
  "mi": 329.63,
  "fa": 349.23,
  "sol": 392.00,
  "la": 440,
  "si": 493.88
}

const freqs = []
for(let i=1; i <= 10; ++i) {
  freqs.push(notes.la * i)
}

function init() {
  heading.textContent = 'Musicode';
  document.body.removeEventListener('click', init)

  const audio = document.querySelector("audio")
  const analyser = createAnalyser(ctx => ctx.createMediaElementSource(audio))

  var canvas = document.querySelector('.visualizer');
  var canvasCtx = canvas.getContext("2d");

  visualize(analyser);

  function visualize(analyser) {
    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    analyser.fftSize = 32;
    const bufferSize = analyser.frequencyBinCount;
    var bufferData = new Uint8Array(bufferSize);


    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    var drawAlt = function() {
      console.log(bufferData)
      drawVisual = requestAnimationFrame(drawAlt);

      analyser.getByteFrequencyData(bufferData);

      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      var barWidth = (WIDTH / bufferSize) * 2.5;
      var x = 0;

      bufferData.forEach(data => {

        canvasCtx.fillStyle = 'rgb(255,50,50)';
        canvasCtx.fillRect(x,HEIGHT-data/2,barWidth,data/2);

        x += barWidth + 1;
      })
    }
    drawAlt();
  }
}