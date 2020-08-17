import colors from "./colors.js";
import colorNames from "./colorNames.js";

const getBin = (value, bins) => Math.max(...bins.filter((bin) => value >= bin));
const getColor = (value, bins) =>
  colors[colorNames[bins.indexOf(getBin(value, bins))]];

export default getColor;
