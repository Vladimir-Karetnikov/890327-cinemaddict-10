import AbstractSmartComponent from "./abstract-smart-component";
import {getFilmDuration} from '../utils/utils.js';
import {debounce} from 'debounce';
import {DEBOUNCE_TIMEOUT, DescriptionLength} from '../utils/const.js';

export default class MovieCard extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this.movie = movie;
  }

  getTemplate() {
    let description = [...this.movie.description].join(``);
    if (description.length > DescriptionLength.MAX) {
      description = description.substring(0, DescriptionLength.REQUIRED) + `…`;
    }

    return (
      `<article class="film-card">
    <h3 class="film-card__title">${this.movie.title}</h3>
    <p class="film-card__rating">${this.movie.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this.movie.releaseDate.getFullYear()}</span>
      <span class="film-card__duration">${getFilmDuration(this.movie.runtime)}</span>
      <span class="film-card__genre">${[...this.movie.genres].join(` `)}</span>
    </p>
    <img src=${this.movie.poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${this.movie.comments.length} comment${this.movie.comments.length === 1 ? `` : `s`}</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist  ${this.movie.onWatchList ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this.movie.onHistory ? `film-card__controls-item--active` : ``}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${this.movie.onFavorites ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
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

  recoveryListeners() {

  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, debounce(handler, DEBOUNCE_TIMEOUT));
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, debounce(handler, DEBOUNCE_TIMEOUT));
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, debounce(handler, DEBOUNCE_TIMEOUT));
  }
}
