/**
 * Gets the indices of the peaks in a given data array. It searches for
 * a span of values above a threshold, and takes the highest of these
 * values as the "peak" for this little "moutain" of data.
 * 
 * @param {Uint8Array} data the data array of unsigned ints, 8 bits long.
 *   these data can be read as integers in doubt.
 * @param {number} baseline the threshold above which a set of values is
 *   detected and treated as a peak.
 * @returns {number[]} an array of integers representing the indices of the
 *   peaks in the original data array.
 */
export function getPeaks(data, baseline) {
  const results = { peaks: [], max: { index: null, value: null } };
  let peak = { index: null, value: null };

  data.forEach((item, idx) => {
    if (item > baseline) {
      if (peak.value == null || item > peak.value) {
        peak = {index: idx, value: item };
      }
    }
    else if (item < baseline && peak.index != null) {
      results.peaks.push(peak.index);
      peak = { index: null, value: null };
    }
    if (results.max.value == null || item > results.max.value) {
      results.max = { index: idx, value: item };
    }
  })
  if (peak.index != null) results.peaks.push(peak.index);
  return results;
}