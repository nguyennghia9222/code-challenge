import { sumToNumberA, sumToNumberB, sumToNumberC } from "../src/sum";

describe("sumToNumberA", () => {
  test("should return a summation from 1 to n", () => {
    expect(sumToNumberA(5)).toBe(15);
  });
});

describe("sumToNumberB", () => {
  test("should return a summation from 1 to n", () => {
    expect(sumToNumberB(5)).toBe(15);
  });
});

describe("sumToNumberC", () => {
  test("should return a summation from 1 to n", () => {
    expect(sumToNumberC(5)).toBe(15);
  });
});
