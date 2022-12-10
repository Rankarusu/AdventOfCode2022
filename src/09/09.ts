import { readFile } from '../fileHelper';

const content = readFile(9);

const instructions = content.split('\n');

class Point {
  public tail?: Point;

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
        this.y++;
        break;
      case 'D':
        this.y--;
        break;
      case 'R':
        this.x++;
        break;
      case 'L':
        this.x--;
        break;
    }
  }

  follow(x: number, y: number) {
    const xDistance = Math.abs(this.x - x);
    const yDistance = Math.abs(this.y - y);

    if (xDistance === 2) {
      if (yDistance >= 1) {
        if (this.y > y) {
          this.move('D');
        } else {
          this.move('U');
        }
      }

      if (this.x > x) {
        this.move('L');
      } else {
        this.move('R');
      }
    } else if (yDistance === 2) {
      if (xDistance >= 1) {
        if (this.x > x) {
          this.move('L');
        } else {
          this.move('R');
        }
      }

      if (this.y > y) {
        this.move('D');
      } else {
        this.move('U');
      }
    }
    this.tail?.follow(this.x, this.y);
  }
}

const visitedPositions: Point[] = [];

const rope: Point[] = [];

for (let i = 0; i < 10; i++) {
  const point = new Point();
  if (i > 0) {
    rope[i - 1].tail = point;
  }
  rope.push(point);
}

instructions.forEach((instruction) => {
  const [direction, _amount] = instruction.split(' ');
  const amount = parseInt(_amount);
  for (let i = 0; i < amount; i++) {
    rope[0].move(direction);
    rope[0].tail?.follow(rope[0].x, rope[0].y);

    if (
      !visitedPositions.find(
        (point) => point.x === rope[9].x && point.y === rope[9].y
      )
    ) {
      visitedPositions.push(new Point(rope[9].x, rope[9].y));
    }
  }
});

console.log(visitedPositions.length);
