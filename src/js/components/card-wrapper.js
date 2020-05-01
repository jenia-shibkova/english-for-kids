import Component from './component';
import CONSTANTS from '../constants';
import DATA from '../data';
import Item from './item';
import Card from './card';

export default class CardWrapper extends Component {
  constructor() {
    super();
    this.template = `
      <main class="content container">
        <div id="rating" class="rating hidden">
        </div>
        <ul class="collections">            
        </ul>
        <button class="button content__button hidden">Start game</button>
      </main>`.trim();

    this.cardTitles = null;
    this.rotateButton = null;
    this.cards = null;
    this.rating = null;
    this.playButton = null;
    this.element = null;

    this.generateCollectionItems = () => {
      const container = document.createDocumentFragment();

      CONSTANTS.collections.forEach((el, item) => {
        const element = new Item(CONSTANTS.wrapperImages[item], el, CONSTANTS.itemName[item]);
        const itemElement = element.createElement();
        container.appendChild(itemElement);
      });

      return container;
    };

    this.generateCards = (data) => {
      const container = document.createDocumentFragment();

      data.forEach((item) => {
        const card = new Card(item);
        const cardElement = card.createElement();
        container.appendChild(cardElement);
      });

      return container;
    };
  }

  getCollections() {
    const container = this.generateCollectionItems();
    this.element = this.createElement();
    const collections = this.element.querySelector('.collections');
    collections.appendChild(container);

    return this.element;
  }

  changeCollection(index) {
    const data = DATA[index];
    const container = this.generateCards(data);
    this.element = this.createElement();
    const collections = this.element.querySelector('.collections');
    collections.append(container);

    return this.element;
  }

  initTrainModeElements() {
    this.rating.classList.add('hidden');
    this.playButton.classList.add('hidden');

    this.showCardTitles();
    this.hiddenCardsImageSize();
    this.showRotateButtons();
  }

  showCardTitles() {
    this.cardTitles.forEach((title) => {
      title.classList.remove('hidden');
    });
  }

  hiddenCardsImageSize() {
    this.cards.forEach((card) => {
      card.classList.remove('card__front--cover');
    });
  }

  showRotateButtons() {
    this.rotateButton.forEach((button) => {
      button.classList.remove('hidden');
    });
  }

  hiddenCardTitles() {
    this.cardTitles.forEach((title) => {
      title.classList.add('hidden');
    });
  }

  addCardsImageSize() {
    this.cards.forEach((card) => {
      card.classList.add('card__front--cover');
    });
  }

  hiddenRotateButtons() {
    this.rotateButton.forEach((button) => {
      button.classList.add('hidden');
    });
  }

  showPlayModeElements() {
    this.rating.classList.remove('hidden');
    this.playButton.classList.remove('hidden');

    this.hiddenCardTitles();
    this.addCardsImageSize();
    this.hiddenRotateButtons();
  }

  resetContentButtonView() {
    this.playButton.classList.remove('content__button--repeat');
  }

  changeContentButtonView() {
    this.playButton.classList.add('content__button--repeat');
  }

  clearRating() {
    this.rating.innerHTML = '';
  }

  initCarsWrapperElements() {
    this.cardTitles = document.querySelectorAll('.card__header');
    this.rotateButton = document.querySelectorAll('.card__rotate');
    this.cards = document.querySelectorAll('.card__front');
    this.rating = document.getElementById('rating');
    this.playButton = document.querySelector('.content__button');
  }
}
