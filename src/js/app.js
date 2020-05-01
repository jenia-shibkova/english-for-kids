import Component from './components/component';
import Header from './components/header';
import CardWrapper from './components/card-wrapper';
import Card from './components/card';
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
      errors: 0,
      successes: 0,
      maxCardsValue: CONSTANTS.maxCardsValue
    };
    this.template = '<div class="app-wrapper"></div>';

    this.appWrapper = null;
    this.mainContent = null;

    this.header = new Header();
    this.cardWrapper = new CardWrapper();
    this.statistics = new Statistics();
    this.star = new Star();
    this.successResult = new Success();
    this.correctSound = new Audio('./assets/audio/correct.mp3');
    this.errorSound = new Audio('./assets/audio/error.mp3');
    this.successSound = new Audio('./assets/audio/success.mp3');
    this.failureSound = new Audio('./assets/audio/failure.mp3');
  }

  resetState() {
    this.state.gameActive = false;
    this.state.randomArr = null;
    this.state.currentSound = null;
    this.state.currentCard = 0;
    this.state.successes = 0;
    this.state.errors = 0;
  }

  playGame() {
    if (this.state.currentCard === this.state.randomArr.length) {
      if (this.state.errors === 0) {
        this.getWinResult();
      } else {
        this.getFailureResult();
      }

      this.resetState();

      setTimeout(() => {
        document.querySelector('.popup').remove();
        this.getStartPage();
      }, 3500);

      return;
    }

    this.state.currentSound = new Audio(`./assets/${this.state.randomArr[this.state.currentCard].audioSrc}`);
    this.state.currentSound.play();
  }

  initPlayMode() {
    this.state.gameActive = true;
    const collectionIndex = CONSTANTS.collections.indexOf(this.state.page);
    const collectionData = DATA[collectionIndex].slice();
    this.state.randomArr = UTILS.shuffle(collectionData);
    this.playGame();
  }

  initRepeatMode() {
    this.state.gameActive = true;
    this.state.randomArr = UTILS.shuffle(this.state.randomArr);
    this.playGame();
  }

  getSuccessAnswer(target) {
    this.correctSound.play();
    this.cardWrapper.rating.appendChild(this.star.createCorrectStar());
    target.classList.add('blocked');

    this.state.successes += 1;
    this.state.currentCard += 1;
  }

  getWrongAnswer() {
    this.errorSound.play();
    this.cardWrapper.rating.appendChild(this.star.createErrorStar());

    this.state.errors += 1;
  }

  getWinResult() {
    document.querySelector('main').innerHTML = '';

    this.successResult.renderElement(document.body);
    this.successSound.play();
  }

  getFailureResult() {
    const resultPopupTemplate = new Failure(this.state.errors);
    document.querySelector('main').innerHTML = '';

    resultPopupTemplate.renderElement(document.body);
    this.failureSound.play();
  }

  initGame(target) {
    if (this.state.gameActive) {
      const currentCardWord = target.querySelector('.card__header').innerHTML;
      const { word } = this.state.randomArr[this.state.currentCard];
      const { translation } = this.state.randomArr[this.state.currentCard];

      if (target.classList.contains('blocked')) return;

      if (currentCardWord === word) {
        this.getSuccessAnswer(target);

        const param = 'successes';
        UTILS.localStorageInit(currentCardWord, translation, this.state.page, param);

        setTimeout(() => this.playGame(), 200);
      } else {
        this.getWrongAnswer();

        const param = 'errors';
        UTILS.localStorageInit(word, translation, this.state.page, param);
      }
    }
  }

  initTrainMode(target) {
    const wordsArr = [...document.querySelectorAll('.card__header')];
    const currentWord = target.querySelector('.card__header').innerHTML;
    const translation = target.querySelectorAll('.card__header')[1].innerHTML;

    const words = UTILS.getInnerHTMLFromArray(wordsArr);

    const wordIndex = words.indexOf(currentWord);
    const collectionIndex = CONSTANTS.collections.indexOf(this.state.page);
    const collectionData = DATA[collectionIndex];
    const wordSound = collectionData[wordIndex].audioSrc;

    const currentSound = new Audio(`./assets/${wordSound}`);

    setTimeout(() => currentSound.play(), 0);

    const param = 'trainModeClicked';
    UTILS.localStorageInit(currentWord, translation, this.state.page, param);
  }

  setTrainMode() {
    this.state.play = false;

    if (this.state.page === CONSTANTS.startPageName
      || this.state.page === CONSTANTS.statisticsPageName) {
      return;
    }

    this.cardWrapper.initTrainModeElements();
    this.cardWrapper.resetContentButtonView();
  }

  setPlayMode() {
    this.state.play = true;

    if (this.state.page === CONSTANTS.startPageName
      || this.state.page === CONSTANTS.statisticsPageName) {
      return;
    }

    this.cardWrapper.showPlayModeElements();
  }

  switchMode(mode) {
    if (mode) {
      this.setPlayMode();
    } else {
      this.setTrainMode();
    }

    this.resetState();

    if (this.state.page !== CONSTANTS.startPageName
      || this.state.page !== CONSTANTS.statisticsPageName) {
      return;
    }

    Card.removeBlockedCardState();
    this.cardWrapper.initCarsWrapperElements();
    this.cardWrapper.clearRating();
  }

  renderStartPage() {
    document.querySelector('main').remove();

    const collections = this.cardWrapper.getCollections();
    this.appWrapper.append(collections);
  }

  changeCollection(target) {
    const collection = target.querySelector('h2').innerHTML;
    this.header.updateHeaderTitle(collection);
    this.state.page = collection;

    const collectionIndex = CONSTANTS.collections.indexOf(collection);
    const itemName = CONSTANTS.itemName[collectionIndex];

    Header.updateActiveLink(itemName);
    this.renderCollectionPage(collectionIndex);

    this.cardWrapper.initCarsWrapperElements();

    if (this.state.play) {
      this.setPlayMode();
    } else {
      this.setTrainMode();
    }
  }

  renderCollectionPage(index) {
    document.querySelector('main').remove();

    const pageContent = this.cardWrapper.changeCollection(index);
    this.appWrapper.append(pageContent);
  }

  onNavigationLinClick(target) {
    const collection = target.innerHTML;
    this.state.page = collection;

    const collectionIndex = CONSTANTS.collections.indexOf(collection);
    const itemName = CONSTANTS.itemName[collectionIndex];

    this.header.updateHeaderTitle(collection);
    Header.updateActiveLink(itemName);
    this.renderCollectionPage(collectionIndex);

    this.cardWrapper.initCarsWrapperElements();
    if (this.state.play) {
      this.setPlayMode();
    } else {
      this.setTrainMode();
    }
  }

  getStartPage() {
    this.renderStartPage();
    this.header.updateHeaderTitle(CONSTANTS.startPageName);
    this.header.addActiveCollectionsLink();
  }

  getStatisticsPage() {
    document.querySelector('main').remove();

    this.state.page = CONSTANTS.statisticsPageName;
    this.header.addActiveStatisticsLink();
    this.header.updateHeaderTitle(CONSTANTS.statisticsPageName);

    const statisticsWrapper = this.statistics.createElement();
    const parsedData = this.statistics.getLocalStorageData();

    if (parsedData.length === 0) {
      const emptyRow = this.statistics.getEmptyRow();
      statisticsWrapper.querySelector('.table__body').appendChild(emptyRow);
    } else {
      const tableRows = Statistics.getTableRowElements(parsedData);
      statisticsWrapper.querySelector('.table__body').append(tableRows);
    }


    this.appWrapper.append(statisticsWrapper);

    this.statistics.initStatistics();
    this.statistics.subscribeOnRepeatButtonClick(this.getRepeatWordsPage.bind(this));

    if (parsedData.length > 0) {
      this.statistics.showRepeatButton();
    }
  }

  onClickHandler({ target, path }) {
    if (target.id === CONSTANTS.startPageName) {
      if (this.state.page === CONSTANTS.startPageName) {
        return;
      }

      this.getStartPage();
    }

    if (target.classList.contains('collections__item-link')) {
      this.changeCollection(target);
    }

    if (target.id !== CONSTANTS.startPageName && target.classList.contains('navigation__item-link')
      && target.id !== CONSTANTS.statisticsPageName) {
      this.onNavigationLinClick(target);
    }

    if (target.id === CONSTANTS.statisticsPageName) {
      this.getStatisticsPage();
      this.header.closeNavigation();
      return;
    }

    if (target.classList.contains('card__wrapper')) {
      if (this.state.play) {
        this.initGame(target);
      } else {
        this.initTrainMode(target);
      }
    }

    if (target.classList.contains('card__rotate')) {
      Card.onButtonRotateHandler(path);
    }

    if (target.classList.contains('content__button') && !target.classList.contains('content__button--repeat')) {
      if (this.state.page !== CONSTANTS.repeatWordsPageName) {
        this.initPlayMode();
      } else {
        this.initRepeatMode();
      }
      this.cardWrapper.changeContentButtonView();
    }

    if (target.classList.contains('content__button--repeat')) {
      this.state.currentSound.play();
    }

    if (!target.classList.contains('page-header__navigation')
      && !target.classList.contains('page-header__button')) {
      if (!this.header.navigation.classList.contains('page-header__navigation--open')) return;

      this.header.closeNavigation();
    }
  }

  initRepeatWordsMode() {
    this.header.setPlayMode();
    this.state.play = true;
    this.state.page = CONSTANTS.repeatWordsPageName;
    this.header.updateHeaderTitle(CONSTANTS.repeatWordsPageName);

    this.cardWrapper.initCarsWrapperElements();
    this.setPlayMode();
  }

  getRepeatWordsPage() {
    document.querySelector('main').remove();

    const sortedData = this.statistics.sortByDescend(CONSTANTS.paramForRepeat);
    const cardsData = UTILS.getRepeatWordsData(sortedData);

    this.state.randomArr = cardsData;

    const cardWrapper = this.cardWrapper.createElement();
    const pageContent = this.cardWrapper.generateCards(cardsData);

    cardWrapper.querySelector('.collections').append(pageContent);
    this.appWrapper.append(cardWrapper);

    this.initRepeatWordsMode();
  }

  initAppElements() {
    this.appWrapper = document.querySelector('.app-wrapper');
  }

  start() {
    const appWrapper = this.createElement();
    const container = document.createDocumentFragment();
    const collections = this.cardWrapper.getCollections();

    this.header.renderElement(container);
    container.appendChild(collections);

    document.body.prepend(appWrapper);
    document.querySelector('.app-wrapper').appendChild(container);
    this.initAppElements();

    this.header.initHeaderElements();
    this.header.start();
    this.header.subscribeOnSwitcherChange(this.switchMode.bind(this));

    document.addEventListener('click', this.onClickHandler.bind(this));
  }
}
