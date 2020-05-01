import Component from './component';

export default class Header extends Component {
  constructor() {
    super();
    this.template = `
    <header class="page-header">     
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
          <li class="navigation__item">
            <a id="Statistics" href="#" class="navigation__item-link">Statistics</a>
          </li>              
        </ul>
      </nav>    
    </header>`.trim();

    this.navigation = null;
    this.navButton = null;
    this.headerTitle = null;
    this.switcher = null;
    this.collectionsLink = null;
    this.statisticsLink = null;
  }

  updateHeaderTitle(value) {
    this.headerTitle.textContent = value;
  }

  addActiveStatisticsLink() {
    document.querySelector('.navigation__item-link--active').classList.remove('navigation__item-link--active');
    this.statisticsLink.classList.add('navigation__item-link--active');
  }

  addActiveCollectionsLink() {
    document.querySelector('.navigation__item-link--active').classList.remove('navigation__item-link--active');
    this.collectionsLink.classList.add('navigation__item-link--active');
  }

  static updateActiveLink(itemName) {
    document.querySelector('.navigation__item-link--active').classList.remove('navigation__item-link--active');
    const navElement = document.querySelector(`.navigation__item-link--${itemName}`);
    navElement.classList.add('navigation__item-link--active');
  }

  closeNavigation() {
    this.navButton.classList.toggle('page-header__button--menu-open');
    this.navigation.classList.toggle('page-header__navigation--open');
  }

  setPlayMode() {
    this.switcher.checked = true;
  }

  initHeaderElements() {
    this.navigation = document.querySelector('.page-header__navigation');
    this.navButton = document.querySelector('.page-header__button');
    this.headerTitle = document.querySelector('.page-header__title');
    this.switcher = document.getElementById('switchState');
    this.collectionsLink = document.getElementById('Collections');
    this.statisticsLink = document.getElementById('Statistics');
  }

  subscribeOnSwitcherChange(func) {
    this.switcher.addEventListener('change', () => {
      func(this.switcher.checked);
    });
  }

  start() {
    this.navButton.addEventListener('click', this.closeNavigation.bind(this));
  }
}
