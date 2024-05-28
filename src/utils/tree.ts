interface TreeLike {
  id: number;
  parent_id: number;
  order?: number;
  children?: TreeLike[];
  [key: string]: any;
}

export function sortTree<T extends TreeLike>(tree: T[]): T[] {
  // Helper function to sort children recursively
  function sortChildren(node: T) {
    if (node.children && node.children.length > 0) {
      // Sort children based on the `order` field
      node.children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      // Recursively sort each child's children
      node.children.forEach((child) => sortChildren(child as T));
    }
  }

  // Sort the root level nodes based on the `order` field
  tree.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  // Recursively sort children for each node at the root level
  tree.forEach(sortChildren);

  return tree;
}

export function listToTree<T extends TreeLike>(list: T[]): TreeLike[] {
  // 实现列表转成树结构，并根据order字段进行递归排序
  const map: { [key: number]: T } = {};
  list.forEach((item) => {
    map[item.id] = item;
  });
  const tree: TreeLike[] = [];
  list.forEach((item) => {
    const parent = map[item.parent_id];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      tree.push(item);
    }
  });
  sortTree(tree);
  return tree;
}
