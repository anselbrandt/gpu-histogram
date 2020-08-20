import React, { useEffect } from "react";

export default function CanvasImage(props) {
  const { width, height, imageRef, bmp } = props;
  useEffect(() => {
    if (bmp) {
      const canvas = imageRef.current;
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      function draw() {
        context.drawImage(bmp, 0, 0, width, height);
        requestAnimationFrame(draw);
      }
      requestAnimationFrame(draw);
      return () => cancelAnimationFrame(draw);
    }
  }, [imageRef, width, height, bmp]);
  return (
    <div>
      <canvas ref={imageRef}></canvas>
    </div>
  );
}
