import {sortTypes} from '../mock/data.js';

export const createFilters = () => {
  return Object.keys(sortTypes).map((type) => (`
    <li>
      <a href="#" class="sort__button
      ${sortTypes[type] ? ` sort__button--active` : ``}">
        Sort by ${type}
      </a>
    </li>`).trim()).join(``);
};
