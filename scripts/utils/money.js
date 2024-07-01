export function convertToDollars(price, decimals = 2) {
  return (Math.round(price) / 100).toFixed(decimals);
}
