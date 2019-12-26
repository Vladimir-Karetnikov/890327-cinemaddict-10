import AbstractComponent from './abstract-component';
import moment from 'moment';

export default class CommentsComponent extends AbstractComponent {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return `<div>
      <h3 class="film-details__comments-title">Comments
        <span class="film-details__comments-count">
          ${this._comments.length}
        </span>
      </h3>
      <ul class="film-details__comments-list">
        ${this._comments.map(({id, img, text, author, day}) => (`<li
          class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${img}.png"
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
                ${moment(day).format(`YYYY/MM/DD HH : MM`)}
              </span>
              <button class="film-details__comment-delete" data-id="${id}">
                Delete
              </button>
            </p>
          </div>
        </li>`)).join(``)}
      </ul></div>`;
  }

  setDeleteCommentButtonHandler(handler) {
    this._deleteCommentButtonHandler = handler;
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((item) => {
      item.addEventListener(`click`, handler);
    });
  }
}
