import Component from './component';
import CONSTANTS from '../constants';
import DATA from '../data';
import Item from './item';
import Card from './card';

export default class CardWrapper extends Component {
  constructor() {
    super();
    this.template = `<main class="content container">
        <div class="rating hidden">
        </div>
        <ul class="collections">            
        </ul>
        <button class="button content__button hidden">Start game</button>
      </main>`;
    this.generateCollectionItems = ()=> {
      const container = document.createDocumentFragment();

      CONSTANTS.collections.forEach((el, item) => {
        const element = new Item(CONSTANTS.wrapperImages[item], el, CONSTANTS.itemName[item]);
        const itemElement = element.createElement();
        container.appendChild(itemElement);
      });

      return container;
    };

    this.generateCards = (index) => {
      const container = document.createDocumentFragment();

      DATA[index].forEach((item) => {
        const card = new Card(item);
        const cardElement = card.createElement();
        container.appendChild(cardElement);
      });

      return container;
    };
  }

  getCollections() {
    const container = this.generateCollectionItems();
    const itemWrapper = this.createElement();
    const collections = itemWrapper.querySelector('.collections');
    collections.appendChild(container);

    return itemWrapper;
  }

  changeCollection(index) {
    const container = this.generateCards(index);
    const itemWrapper = this.createElement();
    const collections = itemWrapper.querySelector('.collections');
    collections.append(container);
    return itemWrapper;
  }
}
