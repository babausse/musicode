const COLOR = "rgb(100, 100, 100)"
const PEAK_COLOR = "rgb(255, 0, 0)"
const MAX_COLOR = "rgb(0, 255, 0)"

/**
 * Gets the fill color corresponding to this data point given its
 * index. If it's the max it's in green, if it's another peak it is
 * in red, otherwise it's just grey.
 * 
 * @param {number} index the index of the data to get the fill color of.
 * @param {object²} pRes the result of the getPeaks function, with the
 *   "peaks" and "max" keys containing respectively a list of
 *   structures and a structure, each having the keys "index" and
 *   "value".
 * @returns {str} the string representing the rgb color for this data point.
 */
function getFillColor(data, index, pRes) {
  if (p.max.index == idx) {
    updateMax(idx)
    return MAX_COLOR;
  }
  else if (p.peaks.includes(idx)) {
    return PEAK_COLOR;
  }
  else {
    return COLOR;
  }
}