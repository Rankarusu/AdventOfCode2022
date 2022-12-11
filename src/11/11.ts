import { readFile } from '../fileHelper';

const content = readFile(11);

class Monkey {
  inspections = 0;

  constructor(
    public items: number[],
    private operationSign: string,
    private operationNumber: number,
    private testDivisor: number,
    private trueThrowIndex: number,
    private falseThrowIndex: number
  ) {}

  operation() {
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
    this.items[0] = Math.floor(this.items[0] / 3);
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

const monkeys: Monkey[] = [];

const monkeyStrings = content.split('\n\n');

monkeyStrings.forEach((monkeyString) => {
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
  monkeys.push(monkey);
});

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

console.log(monkeys);

const inspections = monkeys
  .map((monkey) => monkey.inspections)
  .sort((a, b) => b - a);

console.log(inspections[0] * inspections[1]);
