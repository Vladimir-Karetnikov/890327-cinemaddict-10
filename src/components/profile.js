import AbstractComponent from './abstract-smart-component.js';

export default class Profile extends AbstractComponent {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;
    this._onDataChange = this._onDataChange.bind(this);
    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  getTemplate() {
    const rankName = this._moviesModel.getRank();

    return (`<section class="header__profile profile">
    <p class="profile__rating">${rankName}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`);
  }

  _onDataChange() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this._element = null;

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);
  }
}
