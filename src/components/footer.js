import {movies} from '../mock/data.js';
import AbstractComponent from './abstract-component.js';

export default class Footer extends AbstractComponent {
  getTemplate() {
    return `<footer class="footer">
    <section class="footer__logo logo logo--smaller">
      Cinemaddict
    </section>
    <section class="footer__statistics">
      <p>${movies.length} movies inside</p>
    </section>
    </footer>`;
  }
}
