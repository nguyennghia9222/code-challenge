const sumToNumberB = (n: number): number => {
  if (n <= 0) return 0;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};
// complexity: 0(n)

export { sumToNumberB };
