import AbstractComponent from './abstract-component.js';

export default class MovieCard extends AbstractComponent {
  constructor(movie) {
    super();
    this._movie = movie;
  }

  getTemplate() {
    let description = [...this._movie.description].join(` `);
    if (description.length > 140) {
      description = description.substring(0, 140) + `...`;
    }

    return (
      `<article class="film-card">
    <h3 class="film-card__title">${this._movie.title}</h3>
    <p class="film-card__rating">${this._movie.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this._movie.date.substr(this._movie.date.length - 4)}</span>
      <span class="film-card__duration">${this._movie.runtime}</span>
      <span class="film-card__genre">${[...this._movie.genres].join(` `)}</span>
    </p>
    <img src=${this._movie.poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${this._movie.commentsAmount} comment${this._movie.commentsAmount === 1 ? `` : `s`}</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`
    );
  }

  setPopupOpener(handler) {
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }
}
