import {createMovieCard} from './components/movie-card.js';
import {createMoviePopup} from './components/movie-popup.js';
import {createMainNav} from './components/main-nav.js';
import {createFilters} from './components/filters.js';
import {createShowMoreBtn} from './components/more-btn.js';
import {createProfile} from './components/profile.js';
import {createFilmsSection} from './components/films-section.js';
import {getFooterTemplate} from './components/footer.js';
import {movies} from './mock/data.js';

const MOVIES_STARTING_COUNT = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createProfile(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
const mainNavigation = siteMainElement.querySelector(`.main-navigation`);
render(mainNavigation, createMainNav(), `beforeend`);
const sortList = siteMainElement.querySelector(`.sort`);
render(sortList, createFilters(), `beforeend`);
render(siteMainElement, createFilmsSection(), `beforeend`);
render(siteMainElement, createMoviePopup(movies[0]), `beforeend`);

const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);
let showingMoviesCount = MOVIES_STARTING_COUNT;
movies.slice(0, showingMoviesCount).forEach((movie) => render(mainMoviesContainer, createMovieCard(movie), `beforeend`));

const filmsListSection = document.querySelector(`.films-list`);
render(filmsListSection, createShowMoreBtn(), `beforeend`);

const showMore = siteMainElement.querySelector(`.films-list__show-more`);
showMore.addEventListener(`click`, () => {
  const prevMoviesCount = showingMoviesCount;
  showingMoviesCount = showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

  movies.slice(prevMoviesCount, showingMoviesCount)
    .forEach((movie) => render(mainMoviesContainer, createMovieCard(movie), `beforeend`));

  if (showingMoviesCount >= movies.length) {
    showMore.remove();
  }
});

const compareRating = (b, a) => {
  const first = a.rating;
  const second = b.rating;

  let comparison = 0;
  if (first > second) {
    comparison = 1;
  } else if (first < second) {
    comparison = -1;
  }
  return comparison;
};

const compareComments = (b, a) => {
  const first = a.commentsAmount;
  const second = b.commentsAmount;

  let comparison = 0;
  if (first > second) {
    comparison = 1;
  } else if (first < second) {
    comparison = -1;
  }
  return comparison;
};

const topRatedMovies = movies.sort(compareRating).slice(0, 2);
const topCommentedMovies = movies.sort(compareComments).slice(0, 2);

const topRatedContainer = document.querySelector(`body > main > section > section:nth-child(2) > div`);
topRatedMovies.forEach((movie) => render(topRatedContainer, createMovieCard(movie), `beforeend`));

const mostCommentedContainer = document.querySelector(`body > main > section > section:nth-child(3) > div`);
topCommentedMovies.forEach((movie) => render(mostCommentedContainer, createMovieCard(movie), `beforeend`));

const footer = document.querySelector(`.footer`);
render(footer, getFooterTemplate(), `beforeend`);

const popupCloseBtn = document.querySelector(`.film-details__close-btn`);
popupCloseBtn.addEventListener(`click`, () => document.querySelector(`.film-details`).remove());

