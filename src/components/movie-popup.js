const emojiList = [
  {
    id: `emoji-smile`,
    value: `sleeping`,
    img: `./images/emoji/smile.png`
  },
  {
    id: `emoji-sleeping`,
    value: `neutral-face`,
    img: `./images/emoji/sleeping.png`
  },
  {
    id: `emoji-gpuke`,
    value: `grinning`,
    img: `./images/emoji/puke.png`
  },
  {
    id: `emoji-angry`,
    value: `grinning`,
    img: `./images/emoji/angry.png`
  }
];

const controlsTypes = {
  watchlist: `Add to watchlist`,
  watched: `Already watched`,
  favorite: `Add to favorites`,
};

const getFilmCommentTemplate = (emojis) => {
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
};

const getCommentListTemplate = (comments) => {
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
};

export const createMoviePopup = (movie) =>
  `<section class="film-details">
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
          src="${movie.poster}"
          alt=""
        >
        <p class="film-details__age">${movie.ageRestriction}</p>
      </div>
      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">
              ${movie.title}
            </h3>
            <p class="film-details__title-original">
              Original: ${movie.originalTitle}
            </p>
          </div>
          <div class="film-details__rating">
            <p class="film-details__total-rating">${movie.rating}</p>
          </div>
        </div>
        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${movie.director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">
              Writers
            </td>
            <td class="film-details__cell">
              ${movie.writers.map((writer) => writer).join(`, `)}
            </td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">
              Actors
            </td>
            <td class="film-details__cell">
              ${movie.actors.map((actor) => actor).join(`, `)}
            </td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">
              Release Date
            </td>
            <td class="film-details__cell">
            ${movie.date}
            </td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">
              Runtime
            </td>
            <td class="film-details__cell">
              ${movie.runtime}
            </td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">
              Country
            </td>
            <td class="film-details__cell">
              ${movie.country}
            </td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">
              Genres
            </td>
            <td class="film-details__cell">
              ${movie.genres.map((genre) => (`<span class="film-details__genre">
                ${genre}</span>`)).join(``)}
            </td>
          </tr>
        </table>
        <p class="film-details__film-description">
          ${movie.description}
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
          ${movie.comments.length}
        </span>
      </h3>
      ${getCommentListTemplate(movie.comments)}
      <div class="film-details__new-comment">
        <div for="add-emoji"
          class="film-details__add-emoji-label">
        </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input"
            placeholder="Select reaction below and write comment here"
            name="comment"></textarea>
        </label>
        ${getFilmCommentTemplate(emojiList)}
      </div>
    </section>
  </div>
</form>
</section>`
;
