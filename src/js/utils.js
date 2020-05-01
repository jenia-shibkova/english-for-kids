import CONSTANTS from './constants';
import DATA from './data';

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

const getInnerHTMLFromArray = (array) => {
  const result = [];

  array.forEach((el, index) => {
    if (index % 2 === 0) {
      result.push(el.innerHTML);
    }
  });

  return result;
};

const getFullStatisticsData = (data) => {
  const resultData = [];

  data.forEach((elem) => {
    const percentErrors = getPercentage(elem.successes, elem.errors) || 0;
    resultData.push(Object.assign(elem, { percentErrors }));
  });

  return resultData;
};

const localStorageInit = (word, translation, collection, param) => {
  const savedWords = Object.keys(localStorage);

  if (savedWords.includes(word)) {
    const savedWordData = JSON.parse(localStorage.getItem(word));

    savedWordData[param] += 1;
    localStorage.removeItem(word);
    localStorage.setItem(word, JSON.stringify(savedWordData));
  } else {
    const newWordData = {
      word,
      collection,
      translation,
      trainModeClicked: 0,
      successes: 0,
      errors: 0
    };

    newWordData[param] += 1;
    localStorage.setItem(word, JSON.stringify(newWordData));
  }
};

const getRepeatWordsData = (array) => {
  const data = [];
  const repeatArr = array.splice(0, CONSTANTS.maxCardsValue);

  repeatArr.forEach((elem) => {
    const { collection, word } = elem;
    const collectionIndex = CONSTANTS.collections.indexOf(collection);
    const collectionData = DATA[collectionIndex].slice();

    collectionData.forEach((item, index) => {
      if (item.word === word) {
        data.push(collectionData[index]);
      }
    });
  });

  return data;
};

const UTILS = {
  shuffle,
  getPercentage,
  sortFunc,
  getInnerHTMLFromArray,
  localStorageInit,
  getFullStatisticsData,
  getRepeatWordsData
};

export default UTILS;
