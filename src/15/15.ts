import { readFile } from '../fileHelper';

const regex =
  /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/;
const content = readFile(15);

class Sensor {
  constructor(
    public x: number,
    public y: number,
    public beaconDistance: number
  ) {}
}

const wantedY = 2000000;
const beaconXsInWantedRow = new Set<number>();

const sensors = content.split('\n').map((line) => {
  const match = line.match(regex);
  const [x, y] = [
    parseInt(match?.groups!.sensorX!),
    parseInt(match?.groups!.sensorY!),
  ];

  const [beaconX, beaconY] = [
    parseInt(match?.groups!.beaconX!),
    parseInt(match?.groups!.beaconY!),
  ];

  if (beaconY === wantedY) {
    beaconXsInWantedRow.add(beaconX);
  }

  const xDistance = Math.abs(x - beaconX);
  const yDistance = Math.abs(y - beaconY);

  return new Sensor(x, y, xDistance + yDistance);
});

const impossiblePositions = new Set<number>();

sensors
  .filter(
    (sensor) =>
      wantedY >= sensor.y - sensor.beaconDistance &&
      wantedY <= sensor.y + sensor.beaconDistance
  )
  .forEach((sensor) => {
    // console.log(sensor);
    const remainingDistance =
      sensor.beaconDistance - Math.abs(sensor.y - wantedY);
    // console.log(remainingDistance);
    const min = sensor.x - remainingDistance;
    const max = sensor.x + remainingDistance;
    // console.log(min, max);

    for (let x = min; x <= max; x++) {
      if (!beaconXsInWantedRow.has(x)) impossiblePositions.add(x);
    }
  });

// console.log(Array.from(impossiblePositions.values()).sort((a, b) => a - b));
console.log(impossiblePositions.size);
