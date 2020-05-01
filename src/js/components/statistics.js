import Component from './component';
import EmptyRow from './empty-row';
import TableRow from './table-row';
import UTILS from '../utils';

export default class Statistics extends Component {
  constructor() {
    super();
    this.template = `
    <main class="content statistics">
      <div class="statistics__table table-wrapper">
        <table class="table">
          <thead class="table__head">
            <tr>
              <th class="th column1">
                <span class="icon"></span>
                <span class="title">Collection</span>
                <span id="collection" class="sorter">
                  <span role="img" aria-label="caret-up" class="sorter__arrow sorter__arrow--up">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" fill="white" aria-hidden="true">
                      <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                    </svg>
                  </span>
                  <span role="img" aria-label="caret-down" class="sorter__arrow sorter__arrow--down">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" fill="white" aria-hidden="true">
                      <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                    </svg>
                  </span>
                </span>
              </th>
              <th class="th column2">
                <span class="icon"></span>
                <span class="title">word</span>
                <span id="word" class="sorter">
                  <span role="img" aria-label="caret-up" class="sorter__arrow sorter__arrow--up">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="0.9em" fill="white" aria-hidden="true">
                      <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                    </svg>
                  </span>
                  <span role="img" aria-label="caret-down" class="sorter__arrow sorter__arrow--down">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="0.9em" fill="white" aria-hidden="true">
                      <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                    </svg>
                  </span>
                </span>
              </th>              
              <th class="th column3">
                <span class="icon"></span>
                <span class="title">translation</span>
                <span id="translation" class="sorter">
                  <span role="img" aria-label="caret-up" class="sorter__arrow sorter__arrow--up">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="0.9em" fill="white" aria-hidden="true">
                      <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                    </svg>
                  </span>
                  <span role="img" aria-label="caret-down" class="sorter__arrow sorter__arrow--down">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="0.9em" fill="white" aria-hidden="true">
                      <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                    </svg>
                  </span>
                </span>
              </th>
              <th class="th column4">
                <span class="title">clicked in</span>              
                <span class="icon"></span>
                <span id="trainModeClicked" class="sorter">
                  <span role="img" aria-label="caret-up" class="sorter__arrow sorter__arrow--up">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="0.9em" fill="white" aria-hidden="true">
                      <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                    </svg>
                  </span>
                  <span role="img" aria-label="caret-down" class="sorter__arrow sorter__arrow--down">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="0.9em" fill="white" aria-hidden="true">
                      <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                    </svg>
                  </span>
                </span>
              </th>
              <th class="th column5">
                <span class="icon"></span>
                <span class="title">number</span>
                <span id="successes" class="sorter">
                  <span role="img" aria-label="caret-up" class="sorter__arrow sorter__arrow--up">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="0.9em" fill="white" aria-hidden="true">
                      <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                    </svg>
                  </span>
                  <span role="img" aria-label="caret-down" class="sorter__arrow sorter__arrow--down">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="0.9em" fill="white" aria-hidden="true">
                      <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                    </svg>
                  </span>
                </span>
              </th>
              <th class="th column6">
                <span class="icon"></span>
                <span class="title">number</span>
                <span id="errors" class="sorter">
                  <span role="img" aria-label="caret-up" class="sorter__arrow sorter__arrow--up">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="0.9em" fill="white" aria-hidden="true">
                      <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                    </svg>
                  </span>
                  <span role="img" aria-label="caret-down" class="sorter__arrow sorter__arrow--down">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="0.9em" fill="white" aria-hidden="true">
                      <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                    </svg>
                  </span>
                </span>
              </th>
              <th class="th column7">
                <span class="icon"></span>
                <span id="percentErrors" class="sorter">
                  <span role="img" aria-label="caret-up" class="sorter__arrow sorter__arrow--up">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="0.9em" fill="white" aria-hidden="true">
                      <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
                    </svg>
                  </span>
                  <span role="img" aria-label="caret-down" class="sorter__arrow sorter__arrow--down">
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="0.9em" fill="white" aria-hidden="true">
                      <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                    </svg>
                  </span>
                </span>
              </th>
              <th class="table__reset">
                <button id="reset" class="table__reset-button button">Reset</button>
              </th>
            </tr>
          </thead>
          <tbody class="table__body"></tbody>
        </table>
      </div>
      
      <button class="button statistics__button hidden">Repeat difficult words</button>
    </main>`.trim();

    this.emptyRow = new EmptyRow();
    this.tableData = null;
    this.tableWrapper = null;
    this.tableHead = null;
    this.resetButton = null;
    this.repeatButton = null;
  }

  getLocalStorageData() {
    const savedDataKeys = Object.keys(localStorage);
    const savedData = savedDataKeys.filter((el) => el !== 'loglevel:webpack-dev-server');

    const fullData = savedData.map((key) => localStorage.getItem(key));
    const parsedData = fullData.map((item) => JSON.parse(item));

    const resultData = UTILS.getFullStatisticsData(parsedData);

    this.tableData = resultData.slice();
    return resultData;
  }

  static getTableRowElements(data) {
    const fragment = document.createDocumentFragment();

    data.forEach((rowData) => {
      const row = new TableRow(rowData);
      const rowElement = row.createElement();

      fragment.appendChild(rowElement);
    });

    return fragment;
  }

  renderEmptyRow() {
    const emptyRow = this.getEmptyRow();
    this.tableWrapper.appendChild(emptyRow);
  }

  getEmptyRow() {
    return this.emptyRow.createElement();
  }

  sortByAscend(param) { // press on .sort__arrow--up
    const tableData = this.tableData.slice();
    if (tableData.length === 1) return tableData;

    return UTILS.sortFunc(tableData, param);
  }

  sortByDescend(param) { // press on .sort__arrow--down
    const tableData = this.tableData.slice();
    if (tableData.length === 1) return tableData;

    const sortData = UTILS.sortFunc(tableData, param);
    return sortData.reverse();
  }

  sorterClickHandler() {
    document.querySelector('.table__head').addEventListener('click', ({ target, path }) => {
      if (!target.classList.contains('sorter__arrow')
          || !this.tableData || this.tableData.length === 0) {
        return;
      }

      const param = path[1].id;
      let data;

      if (target.classList.contains('sorter__arrow--up')) {
        data = this.sortByAscend(param);
      }

      if (target.classList.contains('sorter__arrow--down')) {
        data = this.sortByDescend(param);
      }

      const sortedData = Statistics.getTableRowElements(data);
      const tableWrapper = document.querySelector('.table__body');
      tableWrapper.innerHTML = '';
      tableWrapper.append(sortedData);
    });
  }

  resetLocalStorage() {
    localStorage.clear();

    this.tableWrapper.innerHTML = '';
    const emptyRow = this.getEmptyRow();

    this.tableWrapper.appendChild(emptyRow);
    this.tableData = null;
    this.hiddenRepeatButton();
  }

  hiddenRepeatButton() {
    this.repeatButton.classList.add('hidden');
  }

  showRepeatButton() {
    this.repeatButton.classList.remove('hidden');
  }

  onResetButtonClick() {
    this.resetButton.addEventListener('click', this.resetLocalStorage.bind(this));
  }

  subscribeOnRepeatButtonClick(func) {
    this.repeatButton.addEventListener('click', () => {
      func();
    });
  }

  initStatisticsElements() {
    this.tableWrapper = document.querySelector('.table__body');
    this.tableHead = document.querySelector('.table__head');
    this.resetButton = document.getElementById('reset');
    this.repeatButton = document.querySelector('.statistics__button');
  }

  initStatistics() {
    this.initStatisticsElements();
    this.sorterClickHandler();
    this.onResetButtonClick();
  }
}
