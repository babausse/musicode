const NOTES_GAP = 1/12

const notesNames = ["A", "A#", "B", "C", "D", "D#", "E", "F", "F#", "G", "G#"]

const notes: Array<any> = []

let currentFirst = 55;

for (let i = 0; i < 4; i++) {
  notesNames.forEach((note, idx) => {
    if (idx == 0 && i > 0) currentFirst = currentFirst * 2
    const frequency_jump: number = idx * NOTES_GAP * currentFirst
    notes.push({f: currentFirst + frequency_jump, n: note})
  })
}

export const NOTES = notes;