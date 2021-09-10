import { COLOR, MAX_COLOR } from "./constants";
import { updateMax } from "./updateMax";

/**
 * Gets the fill color corresponding to this data point given its
 * index. If it's the max it's in green, if it's another peak it is
 * in red, otherwise it's just grey.
 * 
 * @param {number} index the index of the data to get the fill color of.
 * @param {object} pRes the result of the getPeaks function, with the
 *   "peaks" and "max" keys containing respectively a list of
 *   structures and a structure, each having the keys "index" and
 *   "value".
 * @returns {str} the string representing the rgb color for this data point.
 */
export function getFillColor(index, pRes) {
  if (pRes.max.index == index) {
    updateMax(index);
    return MAX_COLOR;
  }
  // else if (pRes.peaks.includes(index)) {
  //   return PEAK_COLOR;
  // }
  else {
    return COLOR;
  }
}