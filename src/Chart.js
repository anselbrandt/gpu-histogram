import React, { useEffect } from "react";
import styles from "./Chart.module.css";
import useGetBins from "./useGetBins";
import getColor from "./getColor";

export default function Chart(props) {
  const {
    canvasRef,
    width,
    height,
    histBins,
    data,
    cutoff,
    highCount,
    target,
    range,
  } = props;

  const { bins } = useGetBins(target, range);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < data.length; i++) {
        context.beginPath();
        context.rect(
          i * (width / histBins),
          height,
          width / histBins,
          (-data[i].count / highCount) * height
        );
        context.fillStyle = getColor(data[i].bin, bins);
        context.fill();
      }
      requestAnimationFrame(draw);
    }
    if (data) {
      requestAnimationFrame(draw);
    }
    return () => cancelAnimationFrame(draw);
  }, [canvasRef, width, height, histBins, data, cutoff, highCount, bins]);

  return (
    <div>
      <div className={styles.chartTitle}>Chart</div>
      <div>Pixel ratio: {window.devicePixelRatio}</div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
