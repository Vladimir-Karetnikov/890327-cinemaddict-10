import {sortTypes} from '../mock/data.js';
import AbstractComponent from './abstract-component.js';

export default class Filters extends AbstractComponent {
  getTemplate() {
    return `<ul class="sort">
    ${Object.keys(sortTypes).map((type) => (`
    <li>
      <a href="#" class="sort__button
      ${sortTypes[type] ? ` sort__button--active` : ``}">
        Sort by ${type}
      </a>
    </li>`).trim()).join(``)}</ul>`;
  }
}
