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

    this._openStatsHandler = null;
    this._closeStatsHandler = null;
  }

  render() {
    const container = this._container;
    const movies = this._moviesModel.getMovies();
    const inWatchlist = movies.reduce((acc, movie) => movie.onWatchList === true ? ++acc : acc, 0);
    const inHistory = movies.reduce((acc, movie) => movie.onHistory === true ? ++acc : acc, 0);
    const inFavorites = movies.reduce((acc, movie) => movie.onFavorites === true ? ++acc : acc, 0);

    const oldComponent = this._filterComponent;

    this._filterComponent = new Filter(inWatchlist, inHistory, inFavorites);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
    this._filterComponent.setPageChangeHandler(this._openStatsHandler, this._closeStatsHandler);

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

  setPageChangeHandler(openStatsHandler, closeStatsHandler) {
    this._openStatsHandler = openStatsHandler;
    this._closeStatsHandler = closeStatsHandler;
  }
}
