import { Comparable } from "../subtypes";

interface Tree<T extends Comparable<T> | number | string> {
  get value(): T;
  get size(): number;

  insert(data: T): Tree<T>;
  delete(data?: T): boolean;

  find(data: T): Tree<T> | undefined;
  findPrevious(data: T): Tree<T> | undefined;
  findNext(data: T): Tree<T> | undefined;

  at(i: number): Tree<T>;
  first(): Tree<T>;
  last(): Tree<T>;
  previous(): Tree<T> | undefined;
  next(): Tree<T> | undefined;

  [Symbol.iterator](): IterableIterator<T>;
  traverse(): Generator<Tree<T>>;
  toArray(): T[];
}

export { Comparable, Tree };
