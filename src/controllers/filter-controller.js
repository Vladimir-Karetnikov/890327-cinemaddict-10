import Filter from '../components/filter.js';
import {FilterType} from '../components/filter.js';
import {render, replace, RenderPosition} from '../utils/render.js';

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);

    this._pageSwapHandler = null;
  }

  render() {
    const container = this._container;
    const movies = this._moviesModel.getAllMovies();
    const inWatchlist = movies.reduce((acc, movie) => movie.onWatchList ? ++acc : acc, 0);
    const inHistory = movies.reduce((acc, movie) => movie.onHistory ? ++acc : acc, 0);
    const inFavorites = movies.reduce((acc, movie) => movie.onFavorites ? ++acc : acc, 0);

    const oldComponent = this._filterComponent;

    this._filterComponent = new Filter(inWatchlist, inHistory, inFavorites, this._activeFilterType);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
    this._filterComponent.setPageChangeHandler(this._pageSwapHandler);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }

  setPageChangeHandler(handler) {
    this._pageSwapHandler = handler;
  }
}
