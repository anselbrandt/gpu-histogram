import { useState, useEffect } from "react";
import { gridfill } from "./utils";

export default function useGenerateBmp(data) {
  const [bmp, setBmp] = useState();
  const [padding, setPadding] = useState();

  useEffect(() => {
    async function generateBmp() {
      const grid = gridfill(data);
      setPadding(grid.error);
      const filled = [...Array(grid.error).fill(0), ...data];
      const pixels = filled
        .map((value) =>
          value
            .toString(2)
            .padStart(32, "0")
            .match(/.{1,8}/g)
            .map((value) => parseInt(value, 2))
        )
        .flat();
      const image = new Uint8ClampedArray(pixels);
      const imageData = new ImageData(image, grid.x, grid.y);
      const bmpData = await createImageBitmap(imageData);
      setBmp(bmpData);
    }
    if (data) {
      generateBmp();
    }
  }, [data]);

  return { bmp, padding };
}
