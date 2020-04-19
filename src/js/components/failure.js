import Component from './component';

export default class Failure extends Component {
  constructor(errors) {
    super();
    this.template = `<div class="popup">
    <div class="popup__content">      
      <img class="popup__image" src="assets/img/failure.jpg" width="438" height="351">
      <h2 class="popup__title">Try again!</h2>
      <hr>
      <p class="popup__desc">You made <span class="popup__error-amount">${errors}</span> mistakes.</p>
    </div>
  </div>`;
  }
}
