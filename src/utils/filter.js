import {FilterType} from '../components/filter.js';

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
