// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array

const shuffle = (array) => {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter -= 1;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
};

const UTILS = {
  shuffle: shuffle
};

export default UTILS;
