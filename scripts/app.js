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

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();


  var analyser = audioCtx.createAnalyser();
  analyser.maxDecibels = -20;
  analyser.minDecibels = -40;
  analyser.smoothingTimeConstant = 0.5;


  function createBiquad(frequency) {
    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass"
    filter.frequency.value = frequency;
    filter.Q.value = 1e6;
    return filter;
  }

  function createSource(frequency) {
    const source = audioCtx.createOscillator()
    source.frequency.setValueAtTime(frequency, audioCtx.currentTime)
    return source
  }

  function startOscillators(frequency) {
    freqs.forEach(freq => {
      const source = createSource(freq)
      const filter = createBiquad(freq)
      source.connect(filter)
      filter.connect(gainNode)
      source.start()
    })
  }

  function startMedia() {
    const video = document.querySelector('audio')
    const source = audioCtx.createMediaElementSource(video)
    console.log(source)
    source.connect(gainNode)
  }

  var gainNode = audioCtx.createGain();

  var canvas = document.querySelector('.visualizer');
  var canvasCtx = canvas.getContext("2d");

  startMedia()

  gainNode.connect(analyser);
  analyser.connect(audioCtx.destination);

  visualize();

  function visualize() {
    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    analyser.fftSize = 4096;
    const bufferSize = analyser.frequencyBinCount;
    var bufferData = new Uint8Array(bufferSize);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    var drawAlt = function() {
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