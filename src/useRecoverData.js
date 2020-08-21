import { useState, useEffect } from "react";
import { chunkArray } from "./utils";

export default function useRecoverData(arr, padding) {
  const [recovered, setRecovered] = useState();

  useEffect(() => {
    if (arr && padding) {
      const unpadded = arr.slice(padding * 4);
      const unflat = chunkArray(unpadded, padding);
      setRecovered(unflat);
    }
  }, [arr, padding]);

  return { recovered };
}
