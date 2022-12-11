import { readFile } from '../fileHelper';

const content = readFile(11);

function parseInput(): Monkey[] {
  return content.split('\n\n').map((monkeyString) => {
    const lines = monkeyString.split('\n');
    const items = lines[1]
      .split(':')[1]
      .split(',')
      .map((item) => parseInt(item));
    const opsMatch = lines[2].match(/([\+\-\*\/]).(old|\d+)/)!;
    const operationSign = opsMatch[1];
    const operationNumber = parseInt(opsMatch![2]);
    const testDivisor = parseInt(lines[3].match(/(\d+)/)![0]);
    const trueThrowIndex = parseInt(lines[4].match(/\d+/)![0]);
    const falseThrowIndex = parseInt(lines[5].match(/\d+/)![0]);
    const monkey = new Monkey(
      items,
      operationSign,
      operationNumber,
      testDivisor,
      trueThrowIndex,
      falseThrowIndex
    );
    return monkey;
  });
}
class Monkey {
  inspections = 0;

  constructor(
    public items: number[],
    private operationSign: string,
    private operationNumber: number,
    public testDivisor: number,
    private trueThrowIndex: number,
    private falseThrowIndex: number
  ) {}

  operation(reliefDivisor?: number) {
    //inspect
    let operationNumber = this.operationNumber;
    if (isNaN(operationNumber)) {
      operationNumber = this.items[0];
    }
    switch (this.operationSign) {
      case '+': {
        this.items[0] += operationNumber;
        break;
      }
      case '-': {
        this.items[0] -= operationNumber;
        break;
      }
      case '*': {
        this.items[0] *= operationNumber;
        break;
      }
      case '/':
        {
          this.items[0] /= operationNumber;
        }
        break;
    }

    //relief
    if (reliefDivisor) {
      this.items[0] = this.items[0] % reliefDivisor;
    } else {
      this.items[0] = Math.floor(this.items[0] / 3);
    }
    this.inspections++;
  }

  test(monkeyArr: Monkey[]) {
    let currentItem = this.items.shift()!;
    if (currentItem % this.testDivisor === 0) {
      monkeyArr[this.trueThrowIndex].items.push(currentItem);
    } else {
      monkeyArr[this.falseThrowIndex].items.push(currentItem);
    }
  }
}

let monkeys: Monkey[] = parseInput();

const superMod = monkeys
  .map((monkey) => monkey.testDivisor)
  .filter((num) => !isNaN(num))
  .reduce((a, b) => a * b, 1);

// 20 rounds
for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey) => {
    const itemsLength = monkey.items.length;
    for (let i = 0; i < itemsLength; i++) {
      monkey.operation();
      monkey.test(monkeys);
    }
  });
}

const inspections = monkeys
  .map((monkey) => monkey.inspections)
  .sort((a, b) => b - a);

console.log(inspections[0] * inspections[1]);

//part 2
monkeys = parseInput();

for (let i = 0; i < 10000; i++) {
  monkeys.forEach((monkey) => {
    const itemsLength = monkey.items.length;
    for (let i = 0; i < itemsLength; i++) {
      monkey.operation(superMod);
      monkey.test(monkeys);
    }
  });
}

const inspections2 = monkeys
  .map((monkey) => monkey.inspections)
  .sort((a, b) => b - a);

console.log(inspections2[0] * inspections2[1]);
