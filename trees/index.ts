interface Comparable<T> {
  Compare(other: T): number;
}

interface Tree<T extends Comparable<T> | number | string> {
  readonly Data: T;
  get length(): number;

  insert(data: T): Tree<T>;

  [Symbol.iterator](): IterableIterator<T>;
  traverse(): Generator<Tree<T>>;
  toArray(): T[];

  first(): Tree<T>;
  next(): Tree<T> | undefined;
}

export { Comparable, Tree };
