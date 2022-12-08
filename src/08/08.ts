import { readFile } from '../fileHelper';

const content = readFile(8);

const lines = content.split('\n'); //in fact a square

let visibleTrees = lines.length * 4 - 4;

for (let i = 1; i < lines.length - 1; i++) {
  for (let j = 1; j < lines.length - 1; j++) {
    if (isVisible(i, j)) {
      visibleTrees++;
    }
  }
}

function check1(x: number, y: number, height: number) {
  for (let i = 0; i < x; i++) {
    const el = parseInt(lines[i][y]);
    if (el >= height) {
      return false;
    }
  }
  return true;
}
function check2(x: number, y: number, height: number) {
  for (let i = x + 1; i < lines.length; i++) {
    const el = parseInt(lines[i][y]);
    if (el >= height) {
      return false;
    }
  }
  return true;
}
function check3(x: number, y: number, height: number) {
  for (let i = 0; i < y; i++) {
    const el = parseInt(lines[x][i]);
    if (el >= height) {
      return false;
    }
  }
  return true;
}
function check4(x: number, y: number, height: number) {
  for (let i = y + 1; i < lines.length; i++) {
    const el = parseInt(lines[x][i]);
    if (el >= height) {
      return false;
    }
  }
  return true;
}

function isVisible(x: number, y: number) {
  const height = parseInt(lines[x][y]);
  if (
    check1(x, y, height) ||
    check2(x, y, height) ||
    check3(x, y, height) ||
    check4(x, y, height)
  ) {
    return true;
  }
}

console.log(visibleTrees);
