// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array

const shuffle = (array) => {
  let counter = array.length;
  const shuffleArr = array.slice();

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter -= 1;

    let temp = shuffleArr[counter];
    shuffleArr[counter] = shuffleArr[index];
    shuffleArr[index] = temp;
  }

  return shuffleArr;
};

const UTILS = {
  shuffle: shuffle
};

export default UTILS;
