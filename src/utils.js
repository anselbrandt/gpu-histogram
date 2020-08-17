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

export default { getMin, getMax, getHistogram };
