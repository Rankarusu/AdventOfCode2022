import { readFile } from '../fileHelper';

const content = readFile(12);
const lines = content.split('\n');

const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; //we can just run indexof a letter here. The underscore is there to start at 1

class Node {
  public adjacentNodes: Node[] = [];
  public cost = 1;
  public distance = Infinity;
  constructor(public x: number, public y: number, public name: string) {}
}

const nodesArr: Node[][] = [];

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    createNode(j, i);
  }
}

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    nodesArr[i][j].adjacentNodes = findAdjacentNodes(i, j);
  }
}

function createNode(x: number, y: number) {
  const currentChar = lines[y][x];
  const newNode = new Node(x, y, currentChar);
  if (currentChar === 'S') {
    newNode.distance = 0;
  }

  if (nodesArr.length < y + 1) {
    nodesArr.push([]);
  }
  nodesArr[y].push(newNode);
}
function findAdjacentNodes(i: number, j: number) {
  let elevation = getElevation(i, j);

  const adjacentNodes: Node[] = [];
  const adjacentIndices = [
    [i, j - 1],
    [i - 1, j],
    [i, j + 1],
    [i + 1, j],
  ];

  for (const indexPair of adjacentIndices) {
    const [x, y] = indexPair;
    if (indexPair.includes(-1) || x === lines.length || y === lines[i].length) {
      //dont go out of bounds
      continue;
    }

    if (getElevation(x, y) >= elevation - 1) {
      adjacentNodes.push(nodesArr[x][y]);
    }
    //part 1
    // if (getElevation(x, y) <= elevation + 1) {
    //   adjacentNodes.push(nodesArr[x][y]);
    // }
  }

  return adjacentNodes;
}
function getElevation(x: number, y: number) {
  let elevation;

  const currentChar = lines[x][y];
  if (currentChar === 'S') {
    elevation = values.indexOf('a');
  } else if (currentChar === 'E') {
    elevation = values.indexOf('z');
  } else {
    elevation = values.indexOf(currentChar);
  }
  return elevation;
}

function dijkstra(start: Node) {
  const discovered: Node[] = [];
  discovered.push(start);

  while (discovered.length > 0) {
    const currentNode = discovered.shift()!;
    let nodes = currentNode.adjacentNodes;
    nodes = nodes.filter(
      (node) => node.distance > currentNode.distance + node.cost
    );

    nodes.forEach((node) => {
      node.distance = currentNode.distance + node.cost;
      discovered.push(node);
    });
    discovered.sort((a, b) => a.distance - b.distance);
  }
}

const start = nodesArr.flatMap((x) => x).find((node) => node.name === 'S')!;

dijkstra(start);

const end = nodesArr.flatMap((x) => x).find((node) => node.name === 'E')!;

console.log(end);

//part 2
nodesArr.flatMap((x) => x).forEach((node) => (node.distance = Infinity));
end.distance = 0;

dijkstra(end);
const shortestA = Math.min(
  ...nodesArr
    .flatMap((x) => x)
    .filter((node) => node.name === 'a' || node.name === 'S')!
    .map((node) => node.distance)
);

console.log(shortestA);
