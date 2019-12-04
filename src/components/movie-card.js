import {createElement} from '../utils.js';

const createMovieCard = (movie) => {
  let description = [...movie.description].join(` `);
  if (description.length > 140) {
    description = description.substring(0, 140) + `...`;
  }

  return (
    `<article class="film-card">
    <h3 class="film-card__title">${movie.title}</h3>
    <p class="film-card__rating">${movie.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${movie.date.substr(movie.date.length - 4)}</span>
      <span class="film-card__duration">${movie.runtime}</span>
      <span class="film-card__genre">${[...movie.genres].join(` `)}</span>
    </p>
    <img src=${movie.poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${movie.commentsAmount} comment${movie.commentsAmount === 1 ? `` : `s`}</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`
  );
};

export default class MovieCard {
  constructor(movie) {
    this._movie = movie;
    this._element = null;
  }

  getTemplate() {
    return createMovieCard(this._movie);
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
