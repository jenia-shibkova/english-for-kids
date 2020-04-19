export default class Star {
  constructor() {
    this.correct = '<div class="rating__star rating__star--success"></div>';
    this.error = '<div class="rating__star rating__star--error"></div>';
  }

  createCorrectStar() {
    const template = this.correct;
    const newElement = document.createElement('template');
    newElement.innerHTML = template;
    return newElement.content.children[0];
  }

  createErrorStar() {
    const template = this.error;
    const newElement = document.createElement('template');
    newElement.innerHTML = template;
    return newElement.content.children[0];
  }
}
