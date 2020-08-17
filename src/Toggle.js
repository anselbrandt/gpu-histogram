import React from "react";
import styles from "./Toggle.module.css";

export default function Toggle(props) {
  const { id, name, isChecked, handleSetChecked } = props;
  return (
    <label className={styles.switch} htmlFor="switch">
      <input
        type="checkbox"
        name={name}
        id={id}
        onChange={handleSetChecked}
        checked={isChecked}
      />
      <span className={styles.slider} />
    </label>
  );
}
