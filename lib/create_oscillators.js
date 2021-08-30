/**
 * Creates a set of oscillators bound to the given frequencies. One
 * oscillator is created for each provided frequency.
 * 
 * @param {number[]} frequencies an array of integers, each integer
 *   being one frequency to add to the pool of used frequencies.
 * @param {boolean} auto_start TRUE to start the oscillator as soon
 *   as it is created, FALSE to let this responsibility to the user
 *   to start it afterward, or not at all.
 * @returns {OscillatorNode} the oscillator created and started.
 */
function createOscillators(frequencies, auto_start=true) {
  return function (ctx) {
    return frequencies.map(frequency => {
      const oscillator = ctx.createOscillator()
      oscillator.frequency.value = frequency;
      if (auto_start) oscillator.start();
      return oscillator;
    })
  }
}