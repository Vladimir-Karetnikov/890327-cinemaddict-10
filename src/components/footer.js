import AbstractComponent from './abstract-component.js';

export default class Footer extends AbstractComponent {
  constructor(moviesCount) {
    super();
    this._moviesCount = moviesCount;
  }
  getTemplate() {
    return `<footer class="footer">
    <section class="footer__logo logo logo--smaller">
      Cinemaddict
    </section>
    <section class="footer__statistics">
      <p>${this._moviesCount} movies inside</p>
    </section>
    </footer>`;
  }
}
