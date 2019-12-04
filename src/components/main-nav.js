import {menuTypes} from '../mock/data.js';
import {createElement} from '../utils.js';

const createMainNav = () => {
  return menuTypes.map(({link, modifiers, title, filmsCount}) => (`
    <a href="#${link}"
      class="main-navigation__item
      ${modifiers.map((modifier) => (
      `main-navigation__item--` + modifier
    ).trim()).join(` `)}">
      ${title}
      ${filmsCount ? `<span class="main-navigation__item-count">`
      + filmsCount + `</span>` : ``}
    </a>`).trim()).join(``);
};

export default class MainNav {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainNav();
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
