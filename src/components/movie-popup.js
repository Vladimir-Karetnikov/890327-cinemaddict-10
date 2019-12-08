import AbstractComponent from './abstract-component.js';
import {emojiList} from '../mock/data.js';
import {controlsTypes} from '../mock/data.js';

export default class MoviePopup extends AbstractComponent {
  constructor(movie) {
    super();
    this._movie = movie;
  }

  getFilmCommentTemplate(emojis) {
    return `
      <div class="film-details__emoji-list">
        ${emojis.map(({id, value, img}) => (`<input
          class="film-details__emoji-item visually-hidden"
          name="comment-emoji"
          type="radio"
          id="${id}"
          value="${value}"
        >
        <label class="film-details__emoji-label"
          for="${id}">
          <img src="${img}"
            width="30"
            height="30"
            alt="emoji"
          >
        </label>`)).join(``)}
      </div>`;
  }

  getCommentListTemplate(comments) {
    return `
      <ul class="film-details__comments-list">
        ${comments.map(({img, text, author, day}) => (`<li
          class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="${img}"
              width="55"
              height="55"
              alt="emoji"
            >
          </span>
          <div>
            <p class="film-details__comment-text">
              ${text}
            </p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">
                ${author}
              </span>
              <span class="film-details__comment-day">
                ${day}
              </span>
              <button class="film-details__comment-delete">
                Delete
              </button>
            </p>
          </div>
        </li>`)).join(``)}
      </ul>`;
  }

  getTemplate() {
    return `<section class="film-details">
  <form class="film-details__inner"
  action=""
  method="get"
  >
  <div class="form-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn"
        type="button">
        close
      </button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img"
          src="${this._movie.poster}"
          alt=""
        >
        <p class="film-details__age">${this._movie.ageRestriction}</p>
      </div>
      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">
              ${this._movie.title}
            </h3>
            <p class="film-details__title-original">
              Original: ${this._movie.originalTitle}
            </p>
          </div>
          <div class="film-details__rating">
            <p class="film-details__total-rating">${this._movie.rating}</p>
          </div>
        </div>
        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${this._movie.director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">
              Writers
            </td>
            <td class="film-details__cell">
              ${this._movie.writers.map((writer) => writer).join(`, `)}
            </td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">
              Actors
            </td>
            <td class="film-details__cell">
              ${this._movie.actors.map((actor) => actor).join(`, `)}
            </td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">
              Release Date
            </td>
            <td class="film-details__cell">
            ${this._movie.date}
            </td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">
              Runtime
            </td>
            <td class="film-details__cell">
              ${this._movie.runtime}
            </td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">
              Country
            </td>
            <td class="film-details__cell">
              ${this._movie.country}
            </td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">
              Genres
            </td>
            <td class="film-details__cell">
              ${this._movie.genres.map((genre) => (`<span class="film-details__genre">
                ${genre}</span>`)).join(``)}
            </td>
          </tr>
        </table>
        <p class="film-details__film-description">
          ${this._movie.description}
        </p>
      </div>
    </div>
    <section class="film-details__controls">
      ${Object.keys(controlsTypes).map((type) => (`<input type="checkbox"
        class="film-details__control-input visually-hidden"
        id="${type}"
        name="${type}"
      >
      <label for="${type}"
        class="film-details__control-label
          film-details__control-label--${type}">
          ${controlsTypes[type]}
      </label>`)).join(``)}
    </section>
  </div>
  <div class="form-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">
        Comments
        <span class="film-details__comments-count">
          ${this._movie.comments.length}
        </span>
      </h3>
      ${this.getCommentListTemplate(this._movie.comments)}
      <div class="film-details__new-comment">
        <div for="add-emoji"
          class="film-details__add-emoji-label">
        </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input"
            placeholder="Select reaction below and write comment here"
            name="comment"></textarea>
        </label>
        ${this.getFilmCommentTemplate(emojiList)}
      </div>
    </section>
  </div>
</form>
</section>`;
  }

  setCloseClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }
}
