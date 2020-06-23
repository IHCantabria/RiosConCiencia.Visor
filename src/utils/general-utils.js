//aux method to round a value to n decimals
export const roundValue = (number, decimals) => {
  return +(Math.round(number + "e+" + decimals) + "e-" + decimals);
};
//aux method to convert vh to px
export const convertVHtoPX = (windowHeight, vh) => {
  return (windowHeight * vh) / 100;
};
//aux method to convert vw to px
export const convertVWtoPX = (windowWidth, vw) => {
  return (windowWidth * vw) / 100;
};
