const getRandomFloat = (min, max) => Math.random() * (max - min + 1) + min;

const getRandomInteger = (min, max) => Math.floor(getRandomFloat(min, max));

const getRandomNumberOfRandomElements = (sequence) => {
  const sequenceCopy = [...sequence];
  const result = [];
  while (sequenceCopy.length) {
    const randomNumber = getRandomInteger(0, sequenceCopy.length - 1);
    result.push(sequenceCopy.splice(randomNumber, 1));
  }
  const randomLength = getRandomInteger(0, sequence.length);
  return result.splice(0, randomLength);
};

export { getRandomFloat, getRandomInteger, getRandomNumberOfRandomElements };
