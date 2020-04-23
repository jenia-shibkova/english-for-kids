import Component from './component';

export default class TableRow extends Component {
  constructor(data) {
    super();
    this.template = `<tr>
      <td class="column1">${data.collection}</td>
      <td class="column2">${data.word}</td>
      <td class="column3">${data.translation}</td>
      <td class="column4">${data.trainModeClicked}</td>
      <td class="column5">${data.successes}</td>
      <td class="column6">${data.errors}</td>
      <td colspan="2" class="column7">${data.percentErrors}</td>
    </tr>
    <tr>`;
  }

  getTemplate() {
    return this.template;
  }
}
