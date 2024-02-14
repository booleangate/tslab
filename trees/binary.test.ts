import { BinaryTree } from "./binary";

test("construct", () => {
  const tree = new BinaryTree<number>(5);
  expect(tree.Data).toEqual(5);
  expect(tree.length).toEqual(1);
  expect(tree.toArray()).toEqual([5]);
});

test("inserts", () => {
  const tree = new BinaryTree<number>(5);
  tree.insert(3).insert(4).insert(4.5);
  expect(tree.length).toEqual(4);
  expect(tree.toArray()).toEqual([3, 4, 4.5, 5]);
});

test("cannot insert on non-root node", () => {
  const tree = new BinaryTree<number>(5);
  tree.insert(3).insert(6);

  expect(() => {
    // Node(3)
    tree.first().insert(0);
  }).toThrow();
  expect(() => {
    // Node(6)
    tree.next()?.insert(0);
  }).toThrow();
});
