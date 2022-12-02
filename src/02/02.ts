import { readFile } from '../fileHelper';

const content = readFile(2);

//enums were maybe not the best choice for this...

const losePoints = 0;
const drawPoints = 3;
const winPoints = 6;

enum RPS {
  A = 'Rock',
  B = 'Paper',
  C = 'Scissors',
  X = 'Rock',
  Y = 'Paper',
  Z = 'Scissors',
}

enum RPSValues {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

function getScore(opponentChoice: RPS, playerChoice: RPS): number {
  if (opponentChoice === playerChoice) {
    return drawPoints;
  } else if (
    (opponentChoice === 'Rock' && playerChoice === 'Scissors') ||
    (opponentChoice === 'Paper' && playerChoice === 'Rock') ||
    (opponentChoice === 'Scissors' && playerChoice === 'Paper')
  ) {
    return losePoints;
  } else {
    return winPoints;
  }
}

const usableInput = content.split('\n').map((round) => round.split(' '));

const rpsScore = usableInput.reduce((a, b) => {
  const opponentRpsKey = b[0] as keyof typeof RPS;
  const opponentInput = RPS[opponentRpsKey];

  const userRpsKey = b[1] as keyof typeof RPS;
  const userInput = RPS[userRpsKey];

  const choiceScore = RPSValues[userInput as keyof typeof RPSValues];
  const matchScore = getScore(opponentInput, userInput);
  return a + choiceScore + matchScore;
}, 0);

console.log(rpsScore);

//part 2

function findCorrectChoice(opponentChoice: RPS, optimalOutcome: RPS) {
  const opponentIndex = Object.values(RPS).indexOf(opponentChoice);
  let optimalIndex = opponentIndex;
  switch (optimalOutcome) {
    case RPS.X: {
      optimalIndex += 2;
      break;
    }
    case RPS.Y: {
      optimalIndex += 3;
      break;
    }
    case RPS.Z: {
      optimalIndex += 1;
      break;
    }
  }
  return Object.keys(RPS).at(optimalIndex);
}

const rpsScore2 = usableInput.reduce((a, b) => {
  const opponentRpsKey = b[0] as keyof typeof RPS;
  const opponentInput = RPS[opponentRpsKey];

  const userRpsKey = b[1] as keyof typeof RPS;
  const optimalOutcome = RPS[userRpsKey];
  const optimalInputKey = findCorrectChoice(
    opponentInput,
    optimalOutcome
  ) as keyof typeof RPS;
  const optimalInput = RPS[optimalInputKey];

  const choiceScore = RPSValues[optimalInput as keyof typeof RPSValues];

  const matchScore = getScore(opponentInput, optimalInput);
  return a + choiceScore + matchScore;
}, 0);

console.log(rpsScore2);
