import { Tree } from ".";
import { Comparable } from "../subtypes";

class BinaryTree<T extends Comparable<T> | number | string> implements Tree<T> {
  private _parent: BinaryTree<T> | undefined;
  private _left: BinaryTree<T> | undefined;
  private _right: BinaryTree<T> | undefined;
  private _value: T;
  private _size: number;

  constructor(val: T) {
    this._value = val;
    this._size = 1;
  }

  get value(): T {
    return this._value;
  }

  get size(): number {
    return this._size;
  }

  insert(val: T): BinaryTree<T> {
    if (this._parent) {
      throw new Error("Can only insert at the root node");
    }

    this._insert(val);
    return this;
  }

  private _insert(val: T) {
    this._size++;

    if (this.compare(val) < 0) {
      if (!this._left) {
        this._left = new BinaryTree(val);
        this._left._parent = this;
      } else {
        this._left._insert(val);
      }
      return;
    }

    if (!this._right) {
      this._right = new BinaryTree(val);
      this._right._parent = this;
    } else {
      this._right._insert(val);
    }
  }

  delete(val?: T): boolean {
    if (this._size === 1 && this._parent === undefined) {
      throw new Error("Cannot delete last node");
    }

    const target = val ? (this.find(val) as BinaryTree<T>) : this;
    if (!target) {
      return false;
    }

    target._delete();

    return true;
  }

  private _delete() {
    // Is leaf
    if (this._parent && !this._left && !this._right) {
      if (this.isLeft()) {
        this._parent._left = undefined;
      } else {
        this._parent._right = undefined;
      }

      // Because a node can be deleted from anywhere in the tree directly (without calling the operation on the root
      // node), we must walk up the tree and adjust sizes of all parents.
      let p: BinaryTree<T> | undefined;
      for (p = this._parent; p; p = p._parent) {
        --p._size;
      }

      this._parent = undefined;
      return;
    }

    // This is not a leaf so it is guaranteed to have either a left or right.  If it has a left, it is guaranteed to
    // have a previous node, and similarly for right/next. So, swapTarget will always have a value even though
    // previous/next can return undefined in the general case.
    const swapTarget = (
      this._left ? this.previous() : this.next()
    ) as BinaryTree<T>;
    [this._value, swapTarget._value] = [swapTarget._value, this._value];

    return swapTarget._delete();
  }

  find(val: T): Tree<T> | undefined {
    const [, found] = this._find(undefined, val);
    return found;
  }

  findPrevious(val: T): Tree<T> | undefined {
    const [last, found] = this._find(undefined, val);
    if (found) {
      return found?.previous();
    }
    if ((last as BinaryTree<T>).compare(val) < 0) {
      return last?.previous();
    }
    return last;
  }

  findNext(val: T): Tree<T> | undefined {
    const [last, found] = this._find(undefined, val);
    if (found) {
      return found?.next();
    }
    if ((last as BinaryTree<T>).compare(val) > 0) {
      return last?.next();
    }
    return last;
  }

  // Returns (previously inspected node | undefined, node with the target value | undefined)
  private _find(
    last: BinaryTree<T> | undefined,
    val: T
  ): [Tree<T> | undefined, Tree<T> | undefined] {
    switch (this.compare(val)) {
      case -1:
        return this._left ? this._left._find(this, val) : [this, undefined];
      case 1:
        return this._right ? this._right._find(this, val) : [this, undefined];
      default:
        return [last, this];
    }
  }

  at(i: number): Tree<T> {
    if (!(0 <= i && i < this._size)) {
      throw new Error(`${i} is out of bounds [0, ${this._size})`);
    }

    return this;
  }

  first(): Tree<T> {
    return this._left?.first() ?? this;
  }

  last(): Tree<T> {
    return this._right?.last() ?? this;
  }

  previous(): Tree<T> | undefined {
    if (this._left) {
      return this._left.last();
    }

    if (this.isLeft()) {
      // Walk up the tree until we find a parent node that is a right node, the return it's parent.
      let p = this._parent;
      do {
        if (p?.isRight()) {
          return p._parent;
        }
        p = p?._parent;
      } while (p);

      // We only get here when `this` is the maximum (right most) node in the tree
      return undefined;
    }
    return this.isRight() ? this._parent : undefined;
  }

  next(): Tree<T> | undefined {
    if (this._right) {
      return this._right.first();
    }

    if (this.isRight()) {
      // Walk up the tree until we find a parent node that is a left node, the return it's parent.
      let p = this._parent;
      do {
        if (p?.isLeft()) {
          return p._parent;
        }
        p = p?._parent;
      } while (p);

      // We only get here when `this` is the maximum (right most) node in the tree
      return undefined;
    }

    return this.isLeft() ? this._parent : undefined;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    for (const node of this.traverse()) {
      yield node.value;
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

  private isLeft(): boolean {
    return this._parent?._left == this;
  }

  private isRight(): boolean {
    return this._parent?._right == this;
  }

  private compare(val: T): number {
    const comp = val as Comparable<T>;
    if (comp.Compare) return comp.Compare(this.value);

    if (val < this.value) return -1;
    if (val > this.value) return 1;
    return 0;
  }
}

export { BinaryTree };
