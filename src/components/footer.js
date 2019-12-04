import {movies} from '../mock/data.js';
import {createElement} from '../utils.js';

const getFooterTemplate = () => {
  return `<footer class="footer">
    <section class="footer__logo logo logo--smaller">
      Cinemaddict
    </section>
    <section class="footer__statistics">
      <p>${movies.length} movies inside</p>
    </section>
    </footer>`;
};

export default class Footer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getFooterTemplate();
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
