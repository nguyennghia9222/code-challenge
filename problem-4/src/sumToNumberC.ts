const sumToNumberC = (n: number): number => {
  if (n <= 0) return 0;
  return n + sumToNumberC(n - 1);
};
// complexity: 0(n)
// limitation: Maximum call stack size

const delay = (milliseconds: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(0);
    }, milliseconds);
  });
const sumToNumberCWithPromise = (n: number): Promise<number> => {
  async function sumLoopAsync(num: number): Promise<number> {
    if (num <= 0) return 0;
    await delay(0);
    return num + (await sumLoopAsync(num - 1));
  }

  return sumLoopAsync(n);
};
// complexity: 0(n) but depend on Event Loop performance (Just Assumption)
// limitation: Very slow performance base on testing result

export { sumToNumberC, sumToNumberCWithPromise };
