import { BinaryTree } from "./binary";

test("construct", () => {
  const tree = new BinaryTree<number>(5);
  expect(tree.value).toEqual(5);
  expect(tree.size).toEqual(1);
  expect(tree.toArray()).toEqual([5]);
});

describe("insert", () => {
  test("inserts", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(3).insert(4).insert(4.5);
    expect(tree.size).toEqual(4);
    expect(tree.toArray()).toEqual([3, 4, 4.5, 5]);
  });

  test("invalid: insert on non-root node", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(3).insert(6);

    expect(() => {
      tree.find(3)?.insert(0);
    }).toThrow();
    expect(() => {
      tree.find(6)?.insert(0);
    }).toThrow();
  });
});

describe("delete", () => {
  test("root", () => {
    const tree = new BinaryTree<number>(6);
    tree.insert(7).insert(8).insert(9);

    expect(tree.delete()).toEqual(true);
    expect(tree.size).toEqual(3);
    expect(tree.toArray()).toEqual([7, 8, 9]);
  });

  test("branch", () => {
    const tree = new BinaryTree<number>(6);
    tree.insert(7).insert(8).insert(9);

    expect(tree.delete(7)).toEqual(true);
    expect(tree.size).toEqual(3);
    expect(tree.toArray()).toEqual([6, 8, 9]);
  });

  test("leaf", () => {
    const tree = new BinaryTree<number>(6);
    tree.insert(7).insert(8).insert(9);

    expect(tree.delete(9)).toEqual(true);
    expect(tree.size).toEqual(3);
    expect(tree.toArray()).toEqual([6, 7, 8]);
  });

  test("invalid: last remaining node", () => {
    const tree = new BinaryTree<number>(6);

    expect(() => {
      tree.delete(6);
    }).toThrow();
  });
});

describe("find", () => {
  test("exists at root", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(6).insert(7);

    const node = tree.find(5);
    expect(node).toBeDefined();
    expect(node!.value).toEqual(5);
  });

  test("exists at branch", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(6).insert(7);

    const node = tree.find(6);
    expect(node).toBeDefined();
    expect(node!.value).toEqual(6);
  });

  test("exists at lead", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(6).insert(7);

    const node = tree.find(7);
    expect(node).toBeDefined();
    expect(node!.value).toEqual(7);
  });

  test("doesn't exist", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(6).insert(7);

    const node = tree.find(1);
    expect(node).toBeUndefined();
  });
});

describe("findPrevious", () => {
  test("from found value", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(4);

    const prev = tree.findPrevious(5);
    expect(prev).toBeDefined();
    expect(prev?.value).toEqual(4);
  });

  test("from non-existant mid value, left branch", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(3);

    const prev = tree.findPrevious(4);
    expect(prev).toBeDefined();
    expect(prev?.value).toEqual(3);
  });

  test("from non-existant mid value, right branch", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(7);

    const prev = tree.findPrevious(6);
    expect(prev).toBeDefined();
    expect(prev?.value).toEqual(5);
  });

  test("from non-existant max value", () => {
    const tree = new BinaryTree<number>(5);

    const prev = tree.findPrevious(10);
    expect(prev).toBeDefined();
    expect(prev?.value).toEqual(5);
  });

  test("none from root", () => {
    const tree = new BinaryTree<number>(5);

    const prev = tree.findPrevious(5);
    expect(prev).toBeUndefined();
  });
});

describe("findNext", () => {
  test("from found value", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(4);

    const next = tree.findNext(4);
    expect(next).toBeDefined();
    expect(next?.value).toEqual(5);
  });

  test("from non-existant mid value, left branch", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(3);

    const next = tree.findNext(4);
    expect(next).toBeDefined();
    expect(next?.value).toEqual(5);
  });

  test("from non-existant mid value, right branch", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(7);

    const next = tree.findNext(6);
    expect(next).toBeDefined();
    expect(next?.value).toEqual(7);
  });

  test("from non-existant min value", () => {
    const tree = new BinaryTree<number>(5);

    const next = tree.findNext(3);
    expect(next).toBeDefined();
    expect(next?.value).toEqual(5);
  });

  test("none from root", () => {
    const tree = new BinaryTree<number>(5);

    const next = tree.findNext(5);
    expect(next).toBeUndefined();
  });
});

describe("first", () => {
  test("size 1", () => {
    const tree = new BinaryTree<number>(5);

    const first = tree.first();
    expect(first).toBeDefined();
    expect(first.value).toEqual(5);
  });

  test("size >1", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(4).insert(3).insert(1);

    const first = tree.first();
    expect(first).toBeDefined();
    expect(first.value).toEqual(1);
  });
});

describe("last", () => {
  test("size 1", () => {
    const tree = new BinaryTree<number>(5);

    const last = tree.last();
    expect(last).toBeDefined();
    expect(last.value).toEqual(5);
  });

  test("size >1", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(9).insert(6).insert(8);

    const first = tree.last();
    expect(first).toBeDefined();
    expect(first.value).toEqual(9);
  });
});

describe("previous", () => {
  test("nonexistant", () => {
    const tree = new BinaryTree<number>(5);

    expect(tree.previous()).toBeUndefined();
  });

  test("from root", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(4);

    const prev = tree.previous();
    expect(prev).toBeDefined();
    expect(prev!.value).toEqual(4);
  });

  test("from last", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(6).insert(7);

    const prev = tree.last().previous();
    expect(prev).toBeDefined();
    expect(prev!.value).toEqual(6);
  });

  test("from middle", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(7).insert(6);

    const prev = tree.find(6)!.previous();
    expect(prev).toBeDefined();
    expect(prev!.value).toEqual(5);
  });
});

describe("next", () => {
  test("nonexistant", () => {
    const tree = new BinaryTree<number>(5);

    expect(tree.next()).toBeUndefined();
  });

  test("from root", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(6);

    const next = tree.next();
    expect(next).toBeDefined();
    expect(next!.value).toEqual(6);
  });

  test("from first", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(4).insert(3);

    const next = tree.first().next();
    expect(next).toBeDefined();
    expect(next!.value).toEqual(4);
  });

  test("from middle", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(3).insert(4);

    const next = tree.find(4)!.next();
    expect(next).toBeDefined();
    expect(next!.value).toEqual(5);
  });
});

describe("size", () => {
  describe("after insert", () => {
    const tree = new BinaryTree<number>(5);
    tree.insert(3).insert(2).insert(4).insert(7).insert(6).insert(8);
    test("total", () => {
      expect(tree.size).toEqual(7);
    });

    test("left subtree", () => {
      expect(tree.find(3)?.size).toEqual(3);
      expect(tree.find(2)?.size).toEqual(1);
    });

    test("right subtree", () => {
      expect(tree.find(7)?.size).toEqual(3);
      expect(tree.find(8)?.size).toEqual(1);
    });
  });

  describe("after delete", () => {
    test("delete root", () => {
      const tree = new BinaryTree<number>(5);
      tree.insert(3).insert(2).insert(4);

      tree.delete();

      // new root node should have total tree size
      expect(tree.size).toEqual(3);
      expect(tree.previous()!.size).toEqual(2);
      expect(tree.first()!.size).toEqual(1);
    });

    test("delete branch", () => {
      const tree = new BinaryTree<number>(5);
      tree.insert(3).insert(2).insert(4);

      tree.find(3)!.delete();

      expect(tree.size).toEqual(3);

      // branch node: not a great way to get at the branch node and this assertion will be finiky if delete swapping
      // implementation changes.  The extra value assertion helps us understand which node we're expecting in the branch
      // position.
      expect(tree.first()!.value).toEqual(2);
      expect(tree.first()!.size).toEqual(2);

      // leaf (see same not about about finikiness).
      expect(tree.previous()!.value).toEqual(4);
      expect(tree.previous()!.size).toEqual(1);
    });

    test("delete leaf", () => {
      const tree = new BinaryTree<number>(5);
      tree.insert(3).insert(2).insert(4);

      tree.first().delete();
      for (const node of tree.traverse()) {
        if (node.value === 5) {
          // root
          expect(node.size).toEqual(3);
        } else if (node.value === 3) {
          // branch
          expect(node.size).toEqual(2);
        } else {
          // leaf
          expect(node.size).toEqual(1);
        }
      }
    });
  });
});

describe("at", () => {
  const tree = new BinaryTree<number>(5);
  tree.insert(3).insert(2).insert(4).insert(7).insert(6).insert(8);

  test("out of bounds: lower", () => {
    expect(() => {
      tree.at(-1);
    }).toThrow();
  });

  test("out of bounds: upper", () => {
    expect(() => {
      tree.at(tree.size);
    }).toThrow();
  });

  test("first", () => {
    expect(tree.at(0).value).toEqual(2);
  });

  test("middle", () => {
    expect(tree.at(3).value).toEqual(5);
  });

  test("last", () => {
    expect(tree.at(tree.size - 1).value).toEqual(8);
  });

  test("left side", () => {
    expect(tree.at(2).value).toEqual(4);
  });

  test("right side", () => {
    expect(tree.at(4).value).toEqual(6);
  });
});
