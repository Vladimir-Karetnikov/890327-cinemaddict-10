import AbstractSmartComponent from "./abstract-smart-component";
import {getFilmDuration} from '../utils/utils.js';
import moment from 'moment';

export default class MoviePopup extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this._movie = movie;
    this._emoji = null;
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
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1" ${this._movie.userRating === 1 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-1">1</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2" ${this._movie.userRating === 2 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-2">2</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3" ${this._movie.userRating === 3 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-3">3</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4" ${this._movie.userRating === 4 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-4">4</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5" ${this._movie.userRating === 5 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-5">5</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6" ${this._movie.userRating === 6 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-6">6</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7" ${this._movie.userRating === 7 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-7">7</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8" ${this._movie.userRating === 8 ? `checked` : ``}>
                <label class="film-details__user-rating-label" for="rating-8">8</label>
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" ${this._movie.userRating === 9 ? `checked` : ``}>
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
            ${moment(this._movie.releaseDate).format(`DD MMMM YYYY`)}
            </td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">
              Runtime
            </td>
            <td class="film-details__cell">
              ${getFilmDuration(this._movie.runtime)}
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
      <div class="film-details__new-comment">
        <div for="add-emoji"
          class="film-details__add-emoji-label">
          ${this._emoji ? `<img src="./images/emoji/${this._emoji}.png" width="55" height="55" alt="emoji">` : ``}
        </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input"
            placeholder="Select reaction below and write comment here"
            name="comment"></textarea>
        </label>
        <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${this._emoji === `smile` ? `checked` : ``}>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${this._emoji === `sleeping` ? `checked` : ``}>
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="puke" ${this._emoji === `puke` ? `checked` : ``}>
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${this._emoji === `angry` ? `checked` : ``}>
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
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
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, handler);
  }

  setWatchedInputClickHandler(handler) {
    this.getElement().querySelector(`#watched`).addEventListener(`click`, handler);
  }

  setFavoritesInputClickHandler(handler) {
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, handler);
  }

  onEmojiClick() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`film-details__emoji-item`)) {
        this._emoji = evt.target.value;
        this.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = `<img src="./images/emoji/${this._emoji}.png" width="55" height="55" alt="emoji">`;
      }
    });
  }

  setFormHandler(handler) {
    this.getElement().querySelector(`.film-details__inner`)
      .addEventListener(`keydown`, handler);
  }

  setRatingHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((item) => {
      item.addEventListener(`click`, handler);
    });
  }

  setRatingResetHandler(handler) {
    if (this.getElement().querySelector(`.film-details__watched-reset`)) {
      this.getElement().querySelector(`.film-details__watched-reset`).addEventListener(`click`, handler);
    }
  }

  disableForm() {
    this.getElement().querySelector(`.film-details__comment-input`).disabled = true;
    this.getElement().querySelector(`.film-details__comment-input`).style.backgroundColor = `grey`;
  }

  activateForm() {
    this.getElement().querySelector(`.film-details__comment-input`).disabled = false;
    this.getElement().querySelector(`.film-details__comment-input`).style.backgroundColor = `white`;
  }

  disableRating() {
    this.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((el) => {
      el.disabled = true;
    });
  }

  activateRating() {
    this.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((el) => {
      el.disabled = false;
    });
  }

  recoveryListeners() {

  }
}
