export const formatPrices = (prices: string) => {
  return Number(prices).toFixed(2).replace(".", ",");
};
