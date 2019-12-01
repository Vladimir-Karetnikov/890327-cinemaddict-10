import {menuTypes} from '../mock/data.js';

export const createMainNav = () => {
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
