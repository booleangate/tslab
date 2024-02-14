import { Comparable, Tree } from ".";

class BinaryTree<T extends Comparable<T> | number | string> implements Tree<T> {
  readonly Data: T;

  private _parent: BinaryTree<T> | undefined;
  private _left: BinaryTree<T> | undefined;
  private _right: BinaryTree<T>;
  private _length: number;

  constructor(data: T) {
    this.Data = data;
    this._length = 1;
  }

  get length(): number {
    return this._length;
  }

  insert(data: T): BinaryTree<T> {
    if (this._parent) {
      throw new Error("Can only insert at the root node");
    }

    this._insert(data);
    return this;
  }

  _insert(data: T) {
    this._length++;

    if (this.compare(data) < 0) {
      if (!this._left) {
        this._left = new BinaryTree(data);
        this._left._parent = this;
      } else {
        this._left._insert(data);
      }
      return;
    }

    if (!this._right) {
      this._right = new BinaryTree(data);
      this._right._parent = this;
    } else {
      this._right._insert(data);
    }
  }

  *[Symbol.iterator](): IterableIterator<T> {
    for (const node of this.traverse()) {
      yield node.Data;
    }
  }

  *traverse(): Generator<BinaryTree<T>> {
    if (this._left) {
      yield* this._left.traverse();
    }

    yield this;

    if (this._right) {
      yield* this._right.traverse();
    }
  }

  toArray(): T[] {
    const a = Array<T>();
    for (const v of this) {
      a.push(v);
    }
    return a;
  }

  first(): Tree<T> {
    return this._left?.first() ?? this;
  }

  next(): Tree<T> | undefined {
    if (this._right) return this._right.first();
    if (this.isLeft()) return this._parent;
    if (this.isRight()) return this._parent?._parent;
    return undefined;
  }

  private isLeft(): boolean {
    return this._parent?._left == this;
  }

  private isRight(): boolean {
    return this._parent?._right == this;
  }

  private compare(v: T): number {
    const comp = v as Comparable<T>;
    if (comp.Compare) return comp.Compare(this.Data);

    if (v < this.Data) return -1;
    if (v > this.Data) return 1;
    return 0;
  }
}

export { BinaryTree };
