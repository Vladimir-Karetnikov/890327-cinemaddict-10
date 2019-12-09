import {menuTypes} from '../mock/data.js';
import AbstractComponent from './abstract-component.js';

export default class MainNav extends AbstractComponent {
  getTemplate() {
    return `<nav class="main-navigation">
    ${menuTypes.map(({link, modifiers, title, filmsCount}) => (`
    <a href="#${link}"
      class="main-navigation__item
      ${modifiers.map((modifier) => (
      `main-navigation__item--` + modifier
    ).trim()).join(` `)}">
      ${title}
      ${filmsCount ? `<span class="main-navigation__item-count">`
      + filmsCount + `</span>` : ``}
    </a>`).trim()).join(``)}
    </nav>`;
  }
}
