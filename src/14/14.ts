import { readFile } from '../fileHelper';

const content = readFile(14);
const rockLines = content
  .split('\n')
  .map((line) =>
    line
      .split(' -> ')
      .map((coordinates) =>
        coordinates.split(',').map((coordinate) => parseInt(coordinate))
      )
  );

const mapSize = 20000;

const cave = [...Array(mapSize)].map(() => Array(mapSize));

rockLines.forEach((line) => {
  for (let i = 1; i < line.length; i++) {
    const xDist = line[i - 1][0] - line[i][0];
    const yDist = line[i - 1][1] - line[i][1];

    const xStart = Math.min(line[i - 1][0], line[i][0]);
    const xEnd = Math.max(line[i - 1][0], line[i][0]);

    const yStart = Math.min(line[i - 1][1], line[i][1]);
    const yEnd = Math.max(line[i - 1][1], line[i][1]);

    if (xDist === 0) {
      for (let j = yStart; j <= yEnd; j++) {
        cave[xStart][j] = '#';
      }
    }

    if (yDist === 0) {
      for (let j = xStart; j <= xEnd; j++) {
        cave[j][yStart] = '#';
      }
    }
  }
});

let sandCounter = 0;

// while (true) {
//   try {
//     sandFall(500, 0);
//   } catch (error) {
//     console.log(error);
//     console.log(sandCounter);
//     break;
//   }
// }

function sandFall(x: number, y: number) {
  let sandX = x;
  let sandY = y;
  let destinationReached = false;

  while (!destinationReached) {
    if (sandY > mapSize) {
      //fist sand unit to fall into the abyss
      throw new Error('sand has fallen into the abyss');
    }

    if (!cave[sandX][sandY + 1]) {
      sandY++;
    } else {
      if (!cave[sandX - 1][sandY + 1]) {
        sandX--;
        sandY++;
      } else if (!cave[sandX + 1][sandY + 1]) {
        sandX++;
        sandY++;
      } else {
        destinationReached = true;
        sandCounter++;

        cave[sandX][sandY] = 'o';
      }
    }
  }
}

//part 2
const groundY = Math.max(...rockLines.flat().map((x) => x[1])) + 2;

while (true) {
  try {
    sandFall2(500, 0);
  } catch (error) {
    console.log(error);
    console.log(sandCounter);
    break;
  }
}

function sandFall2(x: number, y: number) {
  let sandX = x;
  let sandY = y;
  let destinationReached = false;

  while (!destinationReached) {
    if (cave[x][y]) {
      throw new Error('ceiling reached');
    }

    if (sandY === groundY - 1) {
      //fist sand unit to fall into the abyss
      // throw new Error('sand has fallen into the abyss');
      destinationReached = true;
      sandCounter++;

      cave[sandX][sandY] = 'o';
    }

    if (!cave[sandX][sandY + 1]) {
      sandY++;
    } else {
      if (!cave[sandX - 1][sandY + 1]) {
        sandX--;
        sandY++;
      } else if (!cave[sandX + 1][sandY + 1]) {
        sandX++;
        sandY++;
      } else {
        destinationReached = true;
        sandCounter++;

        cave[sandX][sandY] = 'o';
      }
    }
  }
}
