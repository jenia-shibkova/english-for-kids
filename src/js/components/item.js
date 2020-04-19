import Component from './component';
export default class Item extends Component {
  constructor(data, collection, itemName) {
    super();
    this.template = `<li class="collections__item">
        <a class="collections__item-link collections__item-link--${itemName}">
          <div class="collections__image-wrapper">
            <img src="./assets/img/cards/${data}.jpg" class="collections__image" alt="${data}">
          </div>
          <h2 class="collections__title">${collection}</h2>
        </a>
      </li>`;
  }
}
