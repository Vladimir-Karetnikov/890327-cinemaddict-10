import {FilterType} from '../components/filter.js';
import {SortType} from '../components/sort.js';

export const getMoviesByFilter = (movies, filterType) => {

  switch (filterType) {
    case FilterType.ALL:
      return movies;
    case FilterType.WATCHLIST:
      return movies.filter((movie) => movie.onWatchList);
    case FilterType.HISTORY:
      return movies.filter((movie) => movie.onHistory);
    case FilterType.FAVORITES:
      return movies.filter((movie) => movie.onFavorites);
  }

  return movies;
};

export const getSortedMovies = (movies, sortType) => {

  switch (sortType) {
    case SortType.DATE:
      return movies.slice().sort((a, b) => b.releaseDate - a.releaseDate);
    case SortType.RATING:
      return movies.slice().sort((a, b) => b.rating - a.rating);
    case SortType.DEFAULT:
      return movies.slice();
  }

  return movies;
};
