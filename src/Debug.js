import React, { useState, useEffect } from "react";

export default function Debug(props) {
  const { histBins, data, cutoff, highCount, target, range } = props;
  const [isReceived, setIsReceived] = useState(false);
  useEffect(() => {
    if (histBins && data && cutoff && highCount && target && range) {
      setIsReceived(true);
    }
  }, [histBins, data, cutoff, highCount, target, range]);
  return (
    <div>
      <div>Debug</div>
      <div>{isReceived ? "All props have been received" : null}</div>
    </div>
  );
}
