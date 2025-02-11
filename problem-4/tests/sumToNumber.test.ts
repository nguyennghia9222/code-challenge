import { sumToNumberA } from "../src/sumToNumberA";
import { sumToNumberB } from "../src/sumToNumberB";
import { sumToNumberC } from "../src/sumToNumberC";

describe("sumToNumberA", () => {
  test("should return a summation from 1 to n - using mathematical formula", () => {
    expect(sumToNumberA(5)).toBe(15);
  });
});

describe("sumToNumberB", () => {
  test("should return a summation from 1 to n - using a loop", () => {
    expect(sumToNumberB(5)).toBe(15);
  });
});

describe("sumToNumberC", () => {
  test("should return a summation from 1 to n - using recursion", async () => {
    expect(await sumToNumberC(5)).toBe(15);
  });
});
