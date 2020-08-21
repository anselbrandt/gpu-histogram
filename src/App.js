import React, { useRef, useState, useEffect } from "react";
import styles from "./App.module.css";
import useGetViewport from "./useGetViewport";
import Chart from "./Chart";
import Controls from "./Controls";
import Info from "./Info";
import { csv } from "d3";
import { getMin, getMax, getHistogram } from "./utils";
import Toggle from "./Toggle";
import CanvasImage from "./CanvasImage";
import useGenerateBmp from "./useGenerateBmp";
import useRecoverData from "./useRecoverData";

function App() {
  const { width, height } = useGetViewport();
  const canvasRef = useRef();
  const imageRef = useRef();
  const [histBins, setHistBins] = useState(100);
  const [cutoff, setCutoff] = useState(1500000);
  const [data, setData] = useState();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [histogram, setHistogram] = useState();
  const [highCount, setHighCount] = useState();
  const [peakValue, setPeakValue] = useState();
  const [target, setTarget] = useState(330000);
  const [range, setRange] = useState([0.05, 0.15, 0.3]);
  const { bmp, padding } = useGenerateBmp(data);
  // const { recovered } = useRecoverData(gpuData, padding);

  const [isChecked, setIsChecked] = useState(false);

  const handleSetChecked = (event) => {
    const value = event.target.checked;
    setIsChecked(value);
    if (value) {
      setRange([0.1, 0.25, 0.5]);
    } else {
      setRange([0.05, 0.15, 0.3]);
    }
  };

  useEffect(() => {
    csv("/prices.csv").then((data) => {
      const raw = data
        .map((value) => +Object.values(value)[0])
        .sort((a, b) => +a - b);
      setData(raw);
      const minima = getMin(raw);
      const maxima = getMax(raw);
      setMin(minima);
      setMax(maxima);
    });
  }, []);

  useEffect(() => {
    if (data && histBins && cutoff) {
      const hist = getHistogram(data, histBins, cutoff);
      setHistogram(hist);
      const high = Math.max(...hist.map((value) => value.count));
      setHighCount(high);
      const peak = hist.filter((value) => value.count === high);
      setPeakValue(parseInt(peak[0].bin));
    }
  }, [data, histBins, cutoff]);

  const handleSetTarget = (event) => {
    const value = event.target.value;
    setTarget((+value / 100) * cutoff);
  };

  const handleSetHistBins = (event) => {
    const value = event.target.value;
    setHistBins(+value);
  };

  const handleSetCutoff = (event) => {
    const value = event.target.value;
    setCutoff(+value * 100000);
  };

  return (
    <div className={styles.app}>
      <CanvasImage
        width={parseInt(width * 0.8)}
        height={parseInt(height * 0.5)}
        imageRef={imageRef}
        bmp={bmp}
      />
      <Chart
        width={width * 0.8}
        height={height * 0.5}
        canvasRef={canvasRef}
        histBins={histBins}
        data={histogram}
        cutoff={cutoff}
        highCount={highCount}
        target={target}
        range={range}
      />
      <span>
        Narrow{" "}
        <Toggle
          id={"switch"}
          name={"switch"}
          isChecked={isChecked}
          handleSetChecked={handleSetChecked}
        />{" "}
        Wide
      </span>
      <div className={styles.container}>
        <Controls
          histBins={histBins}
          cutoff={cutoff}
          target={target}
          handleSetHistBins={handleSetHistBins}
          handleSetCutoff={handleSetCutoff}
          handleSetTarget={handleSetTarget}
        />
        <Info
          data={data}
          min={min}
          max={max}
          cutoff={cutoff}
          histBins={histBins}
          highCount={highCount}
          peakValue={peakValue}
          histogram={histogram}
        />
      </div>
    </div>
  );
}

export default App;
