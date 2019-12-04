import {sortTypes} from '../mock/data.js';
import {createElement} from '../utils.js';

const createFilters = () => {
  return Object.keys(sortTypes).map((type) => (`
    <li>
      <a href="#" class="sort__button
      ${sortTypes[type] ? ` sort__button--active` : ``}">
        Sort by ${type}
      </a>
    </li>`).trim()).join(``);
};

export default class Filters {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilters();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
