import { readFile } from '../fileHelper';

const content = readFile(9);

const instructions = content.split('\n');

class Point {
  constructor(public x: number = 0, public y: number = 0) {}
  isEqual(point: Point) {
    if (this.x === point.x && this.y === point.y) {
      return true;
    }
    return false;
  }
  move(direction: string) {
    switch (direction) {
      case 'U':
        this.x++;
        break;
      case 'D':
        this.x--;
        break;
      case 'R':
        this.y++;
        break;
      case 'L':
        this.y--;
        break;
    }
  }
  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const visitedPositions: Point[] = [];

const head = new Point();
const tail = new Point();

instructions.forEach((instruction, index) => {
  const [direction, _amount] = instruction.split(' ');
  const amount = parseInt(_amount);
  for (let i = 0; i < amount; i++) {
    const prevPos = new Point(head.x, head.y);
    head.move(direction);
    const xDistance = Math.abs(tail.x - head.x);
    const yDistance = Math.abs(tail.y - head.y);
    // console.log(xDistance, yDistance);
    if (
      (xDistance === 2 && yDistance === 0) ||
      (xDistance === 0 && yDistance === 2)
    ) {
      tail.move(direction);
      // console.log('move');
    } else if (
      (xDistance === 2 && yDistance === 1) ||
      (xDistance === 1 && yDistance === 2)
    ) {
      tail.setPosition(prevPos.x, prevPos.y);
      // console.log('jump');
    }
    console.log(index);

    console.log(`head pos: ${head.x} ${head.y}`);
    console.log(`tail pos: ${tail.x} ${tail.y}`);
    if (
      !visitedPositions.find(
        (point) => point.x === tail.x && point.y === tail.y
      )
    ) {
      visitedPositions.push(new Point(tail.x, tail.y));
    }
  }
});
console.log(visitedPositions.length);
