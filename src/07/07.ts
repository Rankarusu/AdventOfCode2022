import { readFile } from '../fileHelper';

const content = readFile(7);

const lines = content.split('\n');

const validValues: number[] = [];

enum nodeType {
  file,
  dir,
}

class Node {
  parent?: Node;

  children: Node[] = [];

  name: string;

  value: number = 0;

  type: nodeType;

  constructor(name: string, value: number = 0, type: nodeType) {
    this.name = name;
    this.value = value;
    this.type = type;
  }

  getSize(): number {
    const childSizes = this.children.reduce((a, b) => a + b.getSize(), 0);
    const sum = this.value + childSizes;
    if (this.type === nodeType.dir && sum < 100000) {
      validValues.push(sum);
    }
    return this.value + childSizes;
  }

  addChild(child: Node): void {
    this.children.push(child);
    child.parent = this;
  }
}

let currentNode: Node | undefined;

lines.forEach((line) => {
  if (line.startsWith('$ cd')) {
    const target = line.split(' ')[2];

    if (target === '..') {
      currentNode = currentNode?.parent;
    } else {
      const existingChild = currentNode?.children.find(
        (node) => node.name === target
      );

      if (existingChild) {
        currentNode = existingChild;
      } else {
        const child = new Node(target, undefined, nodeType.dir);
        currentNode?.addChild(child);
        currentNode = child;
      }
    }
  }

  if (line.startsWith('dir')) {
    const name = line.split(' ')[1];
    const newNode = new Node(name, undefined, nodeType.dir);
    currentNode?.addChild(newNode);
  }

  if (line.match(/\d/)) {
    const value = parseInt(line.split(' ')[0]);
    const name = line.split(' ')[1];
    const newNode = new Node(name, value, nodeType.file);
    currentNode?.addChild(newNode);
  }
});

let root = currentNode;

while (root?.parent !== undefined) {
  root = root.parent;
}
root?.getSize();

const result = validValues.reduce((a, b) => a + b);
console.log(result);
