function createStandardPipeline(audioContext, source) {
  const gainNode = audioContext.createGain();
  
  console.log(source)

  source.connect(gainNode);
  gainNode.connect(audioContext.destination)
}