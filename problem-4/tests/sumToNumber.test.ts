import { sumToNumberA } from "../src/sumToNumberA";
import { sumToNumberB } from "../src/sumToNumberB";
import { sumToNumberC, sumToNumberCWithPromise } from "../src/sumToNumberC";

describe("sumToNumberA", () => {
  test("should return a summation from 1 to n - using mathematical formula", () => {
    expect(sumToNumberA(5)).toBe(15);
  });
});

describe("sumToNumberB", () => {
  test("should return a summation from 1 to n - using loop", () => {
    expect(sumToNumberB(5)).toBe(15);
  });
});

describe("sumToNumberC", () => {
  test("should return a summation from 1 to n - using recursive", async () => {
    expect(await sumToNumberC(5)).toBe(15);
  });

  test("should return a summation from 1 to n - using recursive with promise", async () => {
    expect(await sumToNumberCWithPromise(5)).toBe(15);
  });
});
