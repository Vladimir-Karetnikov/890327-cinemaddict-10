import {getMoviesByFilter, getSortedMovies} from '../utils/filter.js';
import {FilterType} from '../components/filter.js';
import {SortType} from '../components/sort.js';

export default class MoviesModel {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL;
    this._activeSortType = SortType.DEFAULT;
    this._filterChangeHandlers = [];
    this._sortChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  getMovies() {
    let filteredMovies = getMoviesByFilter(this._movies, this._activeFilterType);
    return getSortedMovies(filteredMovies, this._activeSortType);
  }

  getAllMovies() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = movies;
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));
    this._dataChangeHandlers.forEach((handler) => handler());

    return movie;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  setSort(sortType) {
    this._activeSortType = sortType;
    this._sortChangeHandlers.forEach((handler) => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setSortChangeHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
