export default class Component {
  constructor() {
    this.template = '';
    this.element = null;
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

  renderElement(container) {
    container.append(this.createElement());
  }

  unrenderElement() {
    this.element.remove();
  }
}
