import AbstractComponent from './abstract-component.js';
import {emojiList} from '../mock/data.js';

export default class MoviePopup extends AbstractComponent {
  constructor(movie) {
    super();
    this._movie = movie;
    this._subscribeOnEvents();
    this._emoji = null;
    this._closeBtnClickHandler = null;
    this._watchlistInputClickHandler = null;
    this._watchedInputClickHandler = null;
    this._favoriteInputClickHandler = null;
  }

  getEmojiListTemplate(emojis) {
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

  createFilmRatingTemplate() {
    return (`<section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <button class="film-details__watched-reset" type="button">Undo</button>
          </div>
          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="${this._movie.poster}" alt="film-poster" class="film-details__user-rating-img">
            </div>
            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${this._movie.title}</h3>
              <p class="film-details__user-rating-feelings">How you feel it?</p>
              <div class="film-details__user-rating-score">
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
                <label class="film-details__user-rating-label" for="rating-1">1</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
                <label class="film-details__user-rating-label" for="rating-2">2</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
                <label class="film-details__user-rating-label" for="rating-3">3</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
                <label class="film-details__user-rating-label" for="rating-4">4</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
                <label class="film-details__user-rating-label" for="rating-5">5</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
                <label class="film-details__user-rating-label" for="rating-6">6</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
                <label class="film-details__user-rating-label" for="rating-7">7</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
                <label class="film-details__user-rating-label" for="rating-8">8</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked>
                <label class="film-details__user-rating-label" for="rating-9">9</label>
              </div>
            </section>
          </div>
        </section>`);
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
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._movie.onWatchList ? `checked` : ``}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._movie.onHistory ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._movie.onFavorites ? `checked` : ``}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>
  </div>
  <div class="form-details__middle-container">${this._movie.onHistory ? this.createFilmRatingTemplate() : ``}</div>
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
        ${this.getEmojiListTemplate(emojiList)}
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

  setWatchlistInputClickHandler(handler) {
    this._watchlistInputClickHandler = handler;
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, handler);
  }

  setWatchedInputClickHandler(handler) {
    this._watchedInputClickHandler = handler;
    this.getElement().querySelector(`#watched`).addEventListener(`click`, handler);
  }

  setFavoritesInputClickHandler(handler) {
    this._favoriteInputClickHandler = handler;
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  _onEmojiClick() {
    const emojis = this.getElement().querySelector(`.film-details__emoji-list`).querySelectorAll(`img`);
    emojis.forEach((it) => it.addEventListener(`click`, () => {
      const oldEmoji = this._emoji;
      this._emoji = it.getAttribute(`src`);
      if (this._emoji !== oldEmoji) {
        this.rerender();
      }
    }));
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, this._watchlistInputClickHandler);
    this.getElement().querySelector(`#watched`).addEventListener(`click`, this._watchedInputClickHandler);
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, this._favoriteInputClickHandler);
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeBtnClickHandler);

    this._onEmojiClick();
  }
}
