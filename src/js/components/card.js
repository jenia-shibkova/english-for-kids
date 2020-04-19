import Component from './component';

export default class Card extends Component {
  constructor(data) {
    super();
    this.template = `<li class="collections__item card">  
        <div class="card__wrapper">       
          <div class="card__front" style="background-image: url(./assets/img/cards/${data.word}.jpg);">
            <p class="card__header">${data.word}</p>     
          </div>
          <div class="card__back" style="background-image: url(./assets/img/cards/${data.word}.jpg);">
            <p class="card__header">${data.translation}</p>
          </div>                    
          <button class="card__rotate button"></button>
        </div>       
      </li>`;
  }
}
