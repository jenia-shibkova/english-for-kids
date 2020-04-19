import Component from './components/component';
import Header from './components/header';
import CardWrapper from './components/card-wrapper';
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
      successes: 0
    };
    this.template = '<div class="app-wrapper"></div>';
    this.header = new Header();
    this.cardWrapper = new CardWrapper();
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
    this.onButtonRotateHandler = (target, path) => {
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
  }

  initGame() {
    const collectionIndex = CONSTANTS.collections.indexOf(this.state.page);
    const collectionData = DATA[collectionIndex].slice();
    this.state.randomArr = UTILS.shuffle(collectionData);
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
      } else {
        this.state.play = false;
        const playButton = document.querySelector('.content__button');

        if (playButton.classList.contains('content__button--repeat')) {
          playButton.classList.remove('content__button--repeat');
        }
        document.querySelector('.rating').innerHTML = '';
      }

      this.changeCardsView();
      this.removeBlockedCardState();
      this.defaultCardState();
    });
  }

  changeCardsView() {
    if (this.state.page === CONSTANTS.startPageName) return;

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

      rotateButton.forEach((button) => {
        button.classList.add('hidden');
      });

      cards.forEach((card) => {
        card.classList.add('card__front--cover');
      });
    } else {
      rating.classList.add('hidden');
      playButton.classList.add('hidden');

      cardTitles.forEach((title) => {
        title.classList.remove('hidden');
      });

      rotateButton.forEach((button) => {
        button.classList.remove('hidden');
      });

      cards.forEach((card) => {
        card.classList.remove('card__front--cover');
      });

      this.state.gameActive = false;
    }
  }

  onCardClickHandler(target) {
    if (!this.state.play) {
      if (target.classList.contains('translate')) return;

      const wordArr = [...document.querySelectorAll('.card__header')];
      const currentWord = target.querySelector('.card__header').innerHTML;

      const words = [];
      wordArr.forEach((el, index) => { 
        if (index % 2 === 0) words.push(el.innerHTML);
      });

      const wordIndex = words.indexOf(currentWord);
      const collectionIndex = CONSTANTS.collections.indexOf(this.state.page);
      const collectionData = DATA[collectionIndex];
      const wordSound = collectionData[wordIndex].audioSrc;

      const currentSound = new Audio(`./assets/${wordSound}`);
      currentSound.play();
    }
    
    if (this.state.gameActive) {
      const currentCardWord = target.querySelector('.card__header').innerHTML;
      const answerWord = this.state.randomArr[this.state.currentCard].word;
      const starWrapper = document.querySelector('.rating');

      if (target.classList.contains('blocked')) return;

      if (currentCardWord === answerWord) {
        this.correctSound.play();
        starWrapper.appendChild(this.star.createCorrectStar());
        target.classList.add('blocked');

        this.state.successes += 1;
        this.state.currentCard += 1;

        if (this.state.currentCard === CONSTANTS.cardsAmount) {
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
      }
    }
  }

  onNavigationClickHandler(target, activeElem) {
    const collection = target.innerHTML.trim();
    this.state.page = collection;
    const collectionIndex = CONSTANTS.collections.indexOf(collection);

    this.changePage(collectionIndex);
    this.updateHeaderTitle(collection);
    this.changeCardsView();

    target.classList.add('navigation__item-link--active');
    activeElem.classList.remove('navigation__item-link--active');
  }

  onCollectionItemClickHandler(target, activeElem) {
    const collection = target.querySelector('h2').innerHTML.trim();
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

    if (target.id === CONSTANTS.startPageName) {
      if (this.state.page === CONSTANTS.startPageName) {
        return;
      }

      this.getStartPage();
      this.state.page = CONSTANTS.startPageName;
      this.updateHeaderTitle(CONSTANTS.startPageName);

      target.classList.add('navigation__item-link--active');
      activeLink.classList.remove('navigation__item-link--active');
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
      this.onButtonRotateHandler(target, path);
    }

    if (target.className === 'button content__button') {
      this.initGame();
      target.classList.add('content__button--repeat');
    }

    if (target.className === 'button content__button content__button--repeat') {
      this.state.currentSound.play();
    }
  }

  changePage(index) {
    this.state.gameActive = false;
    document.querySelector('main').remove();

    const pageContent = this.cardWrapper.changeCollection(index);
    document.querySelector('.app-wrapper').append(pageContent);
  }

  getStartPage() {
    this.state.gameActive = false;

    document.querySelector('main').remove();
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
