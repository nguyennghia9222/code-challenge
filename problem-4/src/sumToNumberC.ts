const sumToNumberC = (n: number): number => {
  if (n <= 0) return 0;
  return n + sumToNumberC(n - 1);
};
// complexity: 0(n)
// limitation: Maximum call stack size

export { sumToNumberC };
