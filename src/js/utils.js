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

const getPercentage = (successes, errors) => {
  const total = successes + errors;
  return Math.round((100 * errors) / total);
};

const sortFunc = (array, param) => {
  return array.sort((a, b) => {
    if (a[param] > b[param]) {
      return 1;
    }
    if (a[param] < b[param]) {
      return -1;
    }
    return 0;
  });
};

const UTILS = {
  shuffle,
  getPercentage,
  sortFunc
};

export default UTILS;
