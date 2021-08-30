// document.body.addEventListener('click', init);

// function init() {
//   document.body.removeEventListener('click', init)
//   const analyser = createAnalyser(createOscillators([31.1, 41.2, 392]))
//   var canvas = document.querySelector('.visualizer');
//   createVisualizer(analyser, canvas)
// }

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
const myAudio = document.querySelector('audio');

myAudio.addEventListener('play', () => {
  audioCtx = new AudioContext();

  let gainNode = audioCtx.createGain();

  let CurY;
  let HEIGHT = window.innerHeight;

  document.onmousemove = updatePage;

  function updatePage(e) {
    CurY = (window.event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

    gainNode.gain.value = CurY/HEIGHT
  }

  const analyser = createAnalyser(context => {
    const myAudio = document.querySelector('audio');
    return context.createMediaElementSource(myAudio);
  })
  
  var canvas = document.querySelector('.visualizer');
  createVisualizer(analyser, canvas)
});