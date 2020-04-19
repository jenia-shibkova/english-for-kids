export default class Component {
  constructor() {
    this.template = '';
  }

  getTemplate() {
    return this.template;
  }

  createElement() {
    const template = this.getTemplate();
    const newElement = document.createElement('template');
    newElement.innerHTML = template;
    return newElement.content.children[0];
  }
}
