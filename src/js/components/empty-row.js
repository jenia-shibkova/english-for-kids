import Component from './component';

export default class EmptyRow extends Component {
  constructor() {
    super();
    this.template = `<tr>
      <td colspan="8" class="no-data">No data</td>
    </tr>`;
  }

  getTemplate() {
    return this.template;
  }
}
