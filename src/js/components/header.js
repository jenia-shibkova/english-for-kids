import Component from './component';

export default class Header extends Component {
  constructor() {
    super();
    this.template = `<header class="page-header">     
      <div class="page-header__buttons-wrapper container">
        <button class="button page-header__button" type="button"></button> 
        <h1 class="page-header__title">Collections</h1>
        <div class="page-header___switcher-wrapper">
          <label class="switch" for="switchState">
            <input type="checkbox" id="switchState">
            <div class="slider round">
            <span class="on play">PLAY</span>
            <span class="off train">TRAIN</span>
            </div>
          </label>
        </div>
        
      </div>

      <nav class="page-header__navigation"> 
        <ul class="navigation">
          <li class="navigation__item">
            <a id="Collections" href="#" class="navigation__item-link navigation__item-link--active">Collections</a>
          </li>
          <li class="navigation__item">
            <a href="#" class="navigation__item-link navigation__item-link--actionsSetA">Actions (set A)</a>
          </li>
          <li class="navigation__item">
            <a href="#" class="navigation__item-link navigation__item-link--actionsSetB">Actions (set B)</a>
          </li>
          <li class="navigation__item">
            <a href="#" class="navigation__item-link navigation__item-link--actionsSetC">Actions (set C)</a>
          </li>
          <li class="navigation__item">
            <a href="#" class="navigation__item-link navigation__item-link--adjectives">Adjectives</a>
          </li>
          <li class="navigation__item">
            <a href="#" class="navigation__item-link navigation__item-link--animalSetA">Animals (set A)</a>
          </li>
          <li class="navigation__item">
            <a href="#" class="navigation__item-link navigation__item-link--animalSetB">Animals (set B)</a>
          </li>
          <li class="navigation__item">
            <a href="#" class="navigation__item-link navigation__item-link--clothes">Clothes</a>
          </li>
          <li class="navigation__item">
            <a href="#" class="navigation__item-link navigation__item-link--emotions">Emotions</a>
          </li>             
        </ul>
      </nav>    
    </header>`;
    this.onNavButtonClick = () => {
      const navButton = document.querySelector('.page-header__button');
      const navigation = document.querySelector('.page-header__navigation');

      if (navButton.classList.contains('page-header__button--menu-open')) {
        navButton.classList.remove('page-header__button--menu-open');
        navigation.classList.remove('page-header__navigation--open');
      } else {
        navButton.classList.add('page-header__button--menu-open');
        navigation.classList.add('page-header__navigation--open');
      }
    };
  }


  start() {
    const navButton = document.querySelector('.page-header__button');

    navButton.addEventListener('click', this.onNavButtonClick.bind(this));
  }
}
