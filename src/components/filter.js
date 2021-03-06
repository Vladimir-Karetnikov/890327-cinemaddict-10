import AbstractComponent from './abstract-component.js';

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

export default class Filter extends AbstractComponent {

  constructor(inWatchlist, inHistory, inFavorites, activeFilter) {
    super();
    this._inWatchlist = inWatchlist;
    this._inHistory = inHistory;
    this._inFavorites = inFavorites;
    this._activeFilter = activeFilter;
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <a href="#all" data-filter-type="${FilterType.ALL}" class="main-navigation__item ${this._activeFilter === `all` ? `main-navigation__item--active` : ``}">All movies</a>
        <a href="#watchlist" data-filter-type="${FilterType.WATCHLIST}" class="main-navigation__item ${this._activeFilter === `watchlist` ? `main-navigation__item--active` : ``}">Watchlist <span class="main-navigation__item-count">${this._inWatchlist}</span></a>
        <a href="#history" data-filter-type="${FilterType.HISTORY}" class="main-navigation__item ${this._activeFilter === `history` ? `main-navigation__item--active` : ``}">History <span class="main-navigation__item-count">${this._inHistory}</span></a>
        <a href="#favorites" data-filter-type="${FilterType.FAVORITES}" class="main-navigation__item ${this._activeFilter === `favorites` ? `main-navigation__item--active` : ``}">Favorites <span class="main-navigation__item-count">${this._inFavorites}</span></a>
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
      </nav>`);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`main-navigation__item`) && !evt.target.classList.contains(`main-navigation__item--active`)) {
        this.getElement().querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
        evt.target.classList.add(`main-navigation__item--active`);

        const filterName = evt.target.dataset.filterType;

        if (!evt.target.classList.contains(`main-navigation__item--additional`)) {
          handler(filterName);
        }
      }
    });
  }

  setPageChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`main-navigation__item`)) {
        handler(evt);
      }
    });
  }
}
