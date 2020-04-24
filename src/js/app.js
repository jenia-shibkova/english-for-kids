import Component from './components/component';
import Header from './components/header';
import CardWrapper from './components/card-wrapper';
import Statistics from './components/statistics';
import Star from './components/star';
import Failure from './components/failure';
import Success from './components/success';
import CONSTANTS from './constants';
import DATA from './data';
import UTILS from './utils';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      page: CONSTANTS.startPageName,
      currentCard: 0,
      currentSound: null,
      play: false,
      gameActive: false,
      randomArr: null,
      repeatData: null,
      errors: 0,
      successes: 0,
      cardNumber: CONSTANTS.maxCardsNumber
    };
    this.template = '<div class="app-wrapper"></div>';
    this.header = new Header();
    this.cardWrapper = new CardWrapper();
    this.statistics = new Statistics();
    this.star = new Star();
    this.successResult = new Success();
    this.correctSound = new Audio('./assets/audio/correct.mp3');
    this.errorSound = new Audio('./assets/audio/error.mp3');
    this.successSound = new Audio('./assets/audio/success.mp3');
    this.failureSound = new Audio('./assets/audio/failure.mp3');
    this.removeBlockedCardState = () => {
      const blockedCards = document.querySelectorAll('.blocked');

      if (blockedCards) {
        blockedCards.forEach((card) => {
          card.classList.remove('blocked');
        });
      }
    };
    this.defaultCardState = () => {
      const cards = document.querySelectorAll('.translate');

      if (cards) {
        cards.forEach((card) => {
          card.classList.remove('translate');
        });
      }
    };
    this.updateHeaderTitle = (value) => {
      document.querySelector('.page-header__title').innerHTML = value;
    };
    this.onButtonRotateHandler = (path) => {
      path[1].classList.add('translate');
      path[1].addEventListener('mouseleave', () => {
        path[1].classList.remove('translate');
      });
    };
  }

  resetState() {
    this.state.page = CONSTANTS.startPageName;
    this.state.gameActive = false;
    this.state.randomArr = null;
    this.state.currentSound = null;
    this.state.currentCard = 0;
    this.state.successes = 0;
    this.state.errors = 0;
    this.repeatData = null;
  }

  initGame() {
    const collectionIndex = CONSTANTS.collections.indexOf(this.state.page);
    const collectionData = DATA[collectionIndex].slice();
    this.state.randomArr = UTILS.shuffle(collectionData);
    this.state.gameActive = true;
    this.playGame();
  }

  initRepeatWordGame() {
    this.state.randomArr = this.state.repeatData;
    this.state.gameActive = true;
    this.playGame();
  }

  playGame() {
    this.state.gameActive = true;
    this.state.currentSound = new Audio(`./assets/${this.state.randomArr[this.state.currentCard].audioSrc}`);
    this.state.currentSound.play();
  }

  repeatSound() {
    this.state.currentSound.play();
  }

  changeSwitchStateHandler() {
    const switcher = document.getElementById('switchState');

    switcher.addEventListener('change', () => {
      if (switcher.checked) {
        this.state.play = true;

        if (this.state.page === CONSTANTS.statisticsPageName) return;
      } else {
        this.state.play = false;
        if (this.state.page === CONSTANTS.statisticsPageName) return;

        const playButton = document.querySelector('.content__button');

        if (playButton) {
          if (playButton.classList.contains('content__button--repeat')) {
            playButton.classList.remove('content__button--repeat');
          }
          document.querySelector('.rating').innerHTML = '';
        }
      }

      this.changeCardsView();
      this.removeBlockedCardState();
      this.defaultCardState();
      this.state.successes = 0;
      this.state.errors = 0;
      this.state.currentCard = 0;
    });
  }

  changeCardsView() {
    if (this.state.page === CONSTANTS.startPageName) {
      return;
    }

    const cardTitles = document.querySelectorAll('.card__header');
    const rotateButton = document.querySelectorAll('.card__rotate');
    const cards = document.querySelectorAll('.card__front');
    const rating = document.querySelector('.rating');
    const playButton = document.querySelector('.content__button');

    if (this.state.play) {
      rating.classList.remove('hidden');
      playButton.classList.remove('hidden');

      cardTitles.forEach((title) => {
        title.classList.add('hidden');
      });

      cards.forEach((card) => {
        card.classList.add('card__front--cover');
      });

      if (rotateButton) {
        rotateButton.forEach((button) => {
          button.classList.add('hidden');
        });
      }
    } else {
      rating.classList.add('hidden');
      playButton.classList.add('hidden');

      cardTitles.forEach((title) => {
        title.classList.remove('hidden');
      });

      cards.forEach((card) => {
        card.classList.remove('card__front--cover');
      });

      rotateButton.forEach((button) => {
        button.classList.remove('hidden');
      });

      this.state.gameActive = false;
    }
  }

  onCardClickHandler(target) {
    if (!this.state.play) {
      if (target.classList.contains('translate')) return;

      const wordArr = [...document.querySelectorAll('.card__header')];
      const currentWord = target.querySelector('.card__header').innerHTML;
      const translation = target.querySelectorAll('.card__header')[1].innerHTML;

      const words = [];
      wordArr.forEach((el, index) => {
        if (index % 2 === 0) words.push(el.innerHTML);
      });

      const wordIndex = words.indexOf(currentWord);
      const collectionIndex = CONSTANTS.collections.indexOf(this.state.page);
      const collectionData = DATA[collectionIndex];
      const wordSound = collectionData[wordIndex].audioSrc;

      const currentSound = new Audio(`./assets/${wordSound}`);

      setTimeout(() => currentSound.play(), 0);

      const param = 'trainModeClicked';
      App.localStorageInit(currentWord, translation, this.state.page, param);
    }

    if (this.state.gameActive) {
      const currentCardWord = target.querySelector('.card__header').innerHTML;
      const answerWord = this.state.randomArr[this.state.currentCard].word;
      const translation = this.state.randomArr[this.state.currentCard].translation;
      const starWrapper = document.querySelector('.rating');

      if (target.classList.contains('blocked')) return;

      if (currentCardWord === answerWord) {
        this.correctSound.play();
        starWrapper.appendChild(this.star.createCorrectStar());
        target.classList.add('blocked');


        this.state.successes += 1;
        this.state.currentCard += 1;

        const param = 'successes';
        App.localStorageInit(currentCardWord, translation, this.state.page, param);

        if (this.state.currentCard === this.state.cardNumber) {
          if (this.state.errors === 0) {
            setTimeout(() => {
              const resultPopup = this.successResult.createElement();
              document.querySelector('main').innerHTML = '';
              document.body.appendChild(resultPopup);
              this.successSound.play();
            }, 300);
          } else {
            setTimeout(() => {
              const resultPopupTemplate = new Failure(this.state.errors);
              const resultPopup = resultPopupTemplate.createElement();
              document.querySelector('main').innerHTML = '';
              document.body.appendChild(resultPopup);
              this.failureSound.play();
            }, 300);
          }

          setTimeout(() => {
            document.querySelector('.popup').remove();
            this.getStartPage();
            this.resetState();
          }, 3500);

          return;
        }

        setTimeout(() => this.playGame(), 700);
      } else {
        this.errorSound.play();
        starWrapper.appendChild(this.star.createErrorStar());

        this.state.errors += 1;
        const param = 'errors';
        App.localStorageInit(answerWord, translation, this.state.page, param);
      }
    }
  }

  static localStorageInit(word, translation, collection, param) {
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
  }

  onNavigationClickHandler(target, activeElem) {
    const collection = target.innerHTML;
    this.state.page = collection;
    const collectionIndex = CONSTANTS.collections.indexOf(collection);

    this.changePage(collectionIndex);
    this.updateHeaderTitle(collection);
    this.changeCardsView();

    target.classList.add('navigation__item-link--active');
    activeElem.classList.remove('navigation__item-link--active');
  }

  onCollectionItemClickHandler(target, activeElem) {
    const collection = target.querySelector('h2').innerHTML;
    this.state.page = collection;
    const collectionIndex = CONSTANTS.collections.indexOf(collection);
    const itemName = CONSTANTS.itemName[collectionIndex];
    const navElement = document.querySelector(`.navigation__item-link--${itemName}`);

    this.changePage(collectionIndex);
    this.updateHeaderTitle(collection);
    this.changeCardsView();

    navElement.classList.add('navigation__item-link--active');
    activeElem.classList.remove('navigation__item-link--active');
  }

  onClickHandler({ target, path }) {
    const activeLink = document.querySelector('.navigation__item-link--active');
    const headerNav = document.querySelector('.page-header__navigation');

    if (target.id === CONSTANTS.startPageName) {
      if (this.state.page === CONSTANTS.startPageName) {
        return;
      }

      this.getStartPage();

      target.classList.toggle('navigation__item-link--active');
      activeLink.classList.toggle('navigation__item-link--active');
    }

    if (target.id === CONSTANTS.statisticsPageName) {
      this.getStatisticsPage();

      activeLink.classList.toggle('navigation__item-link--active');
      target.classList.toggle('navigation__item-link--active');
      this.header.closeNavigation();
      return;
    }

    if (target.id !== CONSTANTS.startPageName && target.classList.contains('navigation__item-link')) {
      this.onNavigationClickHandler(target, activeLink);
    }

    if (target.classList.contains('collections__item-link')) {
      this.onCollectionItemClickHandler(target, activeLink);
    }

    if (target.classList.contains('card__wrapper')) {
      this.onCardClickHandler(target);
    }

    if (target.classList.contains('card__rotate')) {
      this.onButtonRotateHandler(path);
    }

    if (target.className === 'button content__button') {
      if (this.state.page === CONSTANTS.repeatWordsPageName) {
        this.initRepeatWordGame();
      } else {
        this.initGame();
      }
      target.classList.add('content__button--repeat');
    }

    if (target.classList.contains('statistics__button')) {
      this.getRepeatWordsPage();
    }

    if (target.className === 'button content__button content__button--repeat') {
      this.state.currentSound.play();
    }

    if (target.classList.contains('table__reset-button')) {
      this.resetLocalStorage();
    }

    if (!target.classList.contains('page-header__navigation')
    && !target.classList.contains('page-header__button')) {
      if (!headerNav.classList.contains('page-header__navigation--open')) return;
      this.header.closeNavigation();
    }
  }

  changePage(index) {
    this.state.gameActive = false;
    document.querySelector('main').remove();

    const pageContent = this.cardWrapper.changeCollection(index);
    document.querySelector('.app-wrapper').append(pageContent);
  }

  getStatisticsPage() {
    document.querySelector('main').remove();
    this.state.page = CONSTANTS.statisticsPageName;

    const statisticsWrapper = this.statistics.createElement();
    const parsedData = this.statistics.getLocalStorageData();

    if (parsedData.length === 0) {
      const emptyRow = this.statistics.getEmptyRow();
      statisticsWrapper.querySelector('.table__body').appendChild(emptyRow);
    } else {
      const tableRows = Statistics.getTableRowElements(parsedData);
      statisticsWrapper.querySelector('.table__body').append(tableRows);
    }

    this.updateHeaderTitle(CONSTANTS.statisticsPageName);
    document.querySelector('.app-wrapper').append(statisticsWrapper);

    this.statistics.sorterClickHandler();

    if (parsedData.length > 0) {
      document.querySelector('.statistics__button').classList.remove('hidden');
    }
  }

  resetLocalStorage() {
    localStorage.clear();

    if (this.state.page === CONSTANTS.statisticsPageName) {
      const tableBody = document.querySelector('.table__body');
      tableBody.innerHTML = '';

      const emptyRow = this.statistics.getEmptyRow();
      tableBody.appendChild(emptyRow);
      this.statistics.tableData = null;
    }

    document.querySelector('.statistics__button').classList.add('hidden');
  }

  getRepeatWordsPage() {
    if (this.statistics.tableData.length === 0) return;

    document.querySelector('main').remove();

    const repeatParam = CONSTANTS.paramForRepeat;
    const sortedData = this.statistics.sortByDescend(repeatParam);
    const cardsData = App.getRepeatWordsData(sortedData);

    this.state.repeatData = cardsData;
    this.state.cardNumber = cardsData.length;
    const cardWrapper = this.cardWrapper.createElement();
    const pageContent = this.cardWrapper.generateCards(cardsData);

    cardWrapper.querySelector('.collections').append(pageContent);
    document.querySelector('.app-wrapper').append(cardWrapper);

    document.getElementById('switchState').checked = true;
    this.state.play = true;
    this.state.page = CONSTANTS.repeatWordsPageName;
    this.updateHeaderTitle(CONSTANTS.repeatWordsPageName);
    this.changeCardsView();
  }

  static getRepeatWordsData(array) {
    const data = [];
    const repeatArr = array.slice(0, CONSTANTS.maxCardsNumber);

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
  }

  getStartPage() {
    document.querySelector('main').remove();
    this.state.gameActive = false;
    this.state.page = CONSTANTS.startPageName;
    const collections = this.cardWrapper.getCollections();
    this.updateHeaderTitle(CONSTANTS.startPageName);
    document.querySelector('.app-wrapper').append(collections);
  }

  start() {
    const appWrapper = this.createElement();
    const header = this.header.createElement();
    const container = document.createDocumentFragment();
    const collections = this.cardWrapper.getCollections();

    container.appendChild(header);
    container.appendChild(collections);

    document.body.prepend(appWrapper);
    document.querySelector('.app-wrapper').appendChild(container);

    this.header.start();
    this.changeSwitchStateHandler();

    document.addEventListener('click', this.onClickHandler.bind(this));
  }
}
