import { FREQ_GAP } from "./constants";
import { NOTES } from "./notes";
import { closest } from './closest';

export function updateMax(index: number): void {
  const freqWrapper = document.querySelector(".frequency");
  const noteWrapper = document.querySelector(".note");
  const freq = FREQ_GAP * (index + 0.5);
  freqWrapper.textContent = freq.toFixed(2) + " Hz";
  noteWrapper.textContent = closest(NOTES, freq).n;
}