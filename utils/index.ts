export const formatPrices = (prices: string | number) => {
  return Number(prices).toFixed(2).replace(".", ",");
};
