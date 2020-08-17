import React from "react";
import styles from "./Controls.module.css";

export default function Controls(props) {
  const {
    histBins,
    cutoff,
    target,
    handleSetHistBins,
    handleSetCutoff,
    handleSetTarget,
  } = props;
  return (
    <div className={styles.controlsContainer}>
      <div>
        <input
          type="range"
          min={1}
          max={100}
          value={(target / cutoff) * 100}
          onChange={handleSetTarget}
        ></input>
        <div>Target</div>
        <div>{target ? target.toLocaleString() : null}</div>
      </div>
      <div>
        <input
          type="range"
          min={1}
          max={100}
          value={histBins}
          onChange={handleSetHistBins}
        ></input>
        <div>Bins</div>
        <div>{histBins}</div>
      </div>
      <div>
        <input
          type="range"
          min={1}
          max={100}
          value={cutoff / 100000}
          onChange={handleSetCutoff}
        ></input>
        <div>Cutoff</div>
        <div>{cutoff.toLocaleString()}</div>
      </div>
    </div>
  );
}
