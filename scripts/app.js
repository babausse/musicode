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

  const visualizer = new Visualizer(analyser, canvasCtx);

  visualizer.start()
}