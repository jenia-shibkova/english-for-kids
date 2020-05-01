export default class Star {
  constructor() {
    this.correct = '<div class="rating__star rating__star--success"></div>';
    this.error = '<div class="rating__star rating__star--error"></div>';
  }

  createCorrectStar() {
    const template = this.correct;
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstChild;
  }

  createErrorStar() {
    const template = this.error;
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstChild;
  }
}
