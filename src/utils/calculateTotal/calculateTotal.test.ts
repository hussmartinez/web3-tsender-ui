import { describe, test, expect } from "vitest";
import { calculateTotal } from "./calculateTotal";

describe("calculateTotal", () => {
  test("handles basic cases", () => {
    expect(calculateTotal("100")).toBe(100);
    expect(calculateTotal("100\n200\n300")).toBe(600);
    expect(calculateTotal("100,200,300")).toBe(600);
  });

  test("handles mixed format (lines with comma-separated values)", () => {
    expect(calculateTotal("100,200\n300\n400,500")).toBe(1500);
  });

  test("handles decimal numbers", () => {
    expect(calculateTotal("10.5\n20.25\n5.75")).toBe(36.5);
  });

  test("handles negative numbers", () => {
    expect(calculateTotal("100\n-50\n25")).toBe(75);
  });

  test("ignores empty lines", () => {
    expect(calculateTotal("100\n\n200\n\n300")).toBe(600);
  });

  test("ignores empty values in comma-separated list", () => {
    expect(calculateTotal("100,,200,300")).toBe(600);
  });

  test("handles whitespace around values", () => {
    expect(calculateTotal(" 100 \n 200 \n 300 ")).toBe(600);
  });

  test("handles mixed whitespace and empty values", () => {
    expect(calculateTotal(" 100 , , 200 \n\n 300 ")).toBe(600);
  });

  test("ignores invalid number strings", () => {
    expect(calculateTotal("100\nabc\n200\nxyz\n300")).toBe(600);
  });

  test("handles empty input", () => {
    expect(calculateTotal("")).toBe(0);
    expect(calculateTotal("   \n\n   ")).toBe(0);
  });

  test("handles string with only invalid values", () => {
    expect(calculateTotal("abc\ndef\nghi")).toBe(0);
  });

  test("handles zero values", () => {
    expect(calculateTotal("0\n100\n0\n200")).toBe(300);
  });

  test("handles scientific notation", () => {
    expect(calculateTotal("1e2\n2e1\n3")).toBe(123);
  });

  test("handles large numbers", () => {
    expect(calculateTotal("1000000\n2000000\n3000000")).toBe(6000000);
  });
});
