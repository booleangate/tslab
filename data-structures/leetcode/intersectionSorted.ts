// Given two sorted arrays, find their intersection.
function intersectionSorted(a: number[], b: number[]): number[] {
  const intersection = new Array<number>();
  if (a.length > b.length) {
    [a, b] = [b, a];
  }

  let i = 0;
  for (const val of a) {
    while (b[i] < val && i < b.length) i++;
    if (b[i] === val) {
      intersection.push(val);
    }
  }

  return intersection;
}

export default intersectionSorted;
