export function getMin(arr) {
  let min = arr[0];
  arr.forEach((value) => {
    if (value < min) {
      min = value;
    }
  });
  return min;
}

export function getMax(arr) {
  let max = arr[0];
  arr.forEach((value) => {
    if (value > max) {
      max = value;
    }
  });
  return max;
}

export function getHistogram(arr, bins, cutoff) {
  function getMax(arr) {
    let max = arr[0];
    arr.forEach((value) => {
      if (value > max && value < cutoff) {
        max = value;
      }
    });
    return max;
  }
  const max = getMax(arr);
  const width = max / bins;

  const bounds = Array(bins)
    .fill()
    .map((value, index) => index * width)
    .sort();

  const histObj = bounds.reduce(
    (accumulator, current) => Object.assign(accumulator, { [current]: 0 }),
    {}
  );

  arr.forEach((value) => {
    const bin = Math.max(
      ...bounds.filter((bin) => {
        return value >= bin;
      })
    );
    histObj[bin] = histObj[bin] + 1;
  });

  function histArr(obj) {
    return Object.keys(obj).map((value) => {
      return {
        bin: +value,
        count: obj[value],
      };
    });
  }
  return histArr(histObj).sort((a, b) => +a.bin - b.bin);
}

export function gridfill(arr) {
  const pixels = arr;
  const length = pixels.length;
  const square = Number.isInteger(Math.sqrt(length))
    ? Math.sqrt(length)
    : parseInt(Math.sqrt(length)) + 1;
  const rect = Number.isInteger(Math.sqrt(length / 2))
    ? Math.sqrt(length / 2)
    : 2 * (parseInt(Math.sqrt(length / 2)) + 1);
  let results = [];
  for (let i = square; i < rect + 1; i++) {
    const x = i;
    const y = Number.isInteger(length / x)
      ? length / x
      : parseInt(length / x) + 1;
    const error = x * y - length;
    const result = {
      x: x,
      y: y,
      size: x * y,
      error: error,
    };
    results.push(result);
  }
  return results.sort((a, b) => a.error - b.error)[0];
}

export default { getMin, getMax, getHistogram, gridfill };
