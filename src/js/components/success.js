import Component from './component';

export default class Success extends Component {
  constructor() {
    super();
    this.template = `<div class="popup">
      <div class="popup__content">      
        <img class="popup__image" src="assets/img/success.jpg" width="438" height="351">
        <p class="popup__title">Well done!</p>
      </div>
    </div>`;
  }
}
