import intersectionSorted from "./intersectionSorted.ts";

describe("intersectionSorted", () => {
  test("both arrays empty", () => {
    expect(intersectionSorted([], [])).toEqual([]);
  });

  test("fist array empty", () => {
    expect(intersectionSorted([], [1, 2, 3])).toEqual([]);
  });

  test("second array empty", () => {
    expect(intersectionSorted([1, 2, 3], [])).toEqual([]);
  });

  test("no intersection", () => {
    expect(intersectionSorted([1, 2, 3], [4, 5, 6])).toEqual([]);
  });

  test("complete match", () => {
    expect(intersectionSorted([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  test("intersection on opposite ends", () => {
    expect(intersectionSorted([1, 2, 3], [-1, 0, 1])).toEqual([1]);
  });

  describe("intersection non-uniform lengths", () => {
    const short = [-1, 9, 14, 21, 34];
    const long = Array.from(Array(30).keys()).map((i) => i + 1);
    const expected = [9, 14, 21];

    test("short fist, long second", () => {
      expect(intersectionSorted(short, long)).toEqual(expected);
    });

    test("long first, short second", () => {
      const b = expect(intersectionSorted(long, short)).toEqual(expected);
    });
  });
});
