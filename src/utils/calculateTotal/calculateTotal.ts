export function calculateTotal(amounts: string) {
  const total = amounts
    .split(/[\n,]+/)
    .map(val => parseFloat(val.trim()))
    .filter(num => !isNaN(num))
    .reduce((sum, num) => sum + num, 0);

  return total;
}
