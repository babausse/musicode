function createAudioSource(ctx) {
  const audio = document.querySelector("audio")
  return ctx.createMediaElementSource(audio)
}