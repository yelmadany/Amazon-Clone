export function convertToDollars(price, decimals = 2) {
  return (price / 100).toFixed(decimals);
}
