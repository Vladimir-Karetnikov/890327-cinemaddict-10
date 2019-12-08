import MovieCard from './components/movie-card.js';
import MoviePopup from './components/movie-popup.js';
import MainNav from './components/main-nav.js';
import Filters from './components/filters.js';
import ShowMoreBtn from './components/more-btn.js';
import Profile from './components/profile.js';
import FilmsSection from './components/films-section.js';
import Footer from './components/footer.js';
import NoFilms from './components/nofilms-msg.js';
import {render, RenderPosition, KeyCodes, remove} from './utils/render.js';
import {movies} from './mock/data.js';

const MOVIES_STARTING_COUNT = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new MainNav(), RenderPosition.BEFOREEND);
render(siteMainElement, new Filters(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsSection(), RenderPosition.BEFOREEND);
render(document.body, new Footer(), RenderPosition.BEFOREEND);

const renderFilmCards = (movie, container, place) => {
  const filmCardComponent = new MovieCard(movie);
  const filmDetailsComponent = new MoviePopup(movie);

  const isEscEvent = (evt, action) => {
    if (evt.keyCode === KeyCodes.ESC) {
      action();
    }
  };

  const closeFilmDetails = () => {
    remove(filmDetailsComponent);
    document.removeEventListener(`keydown`, onFilmDetailsEscPress);
  };

  const onFilmDetailsEscPress = (evt) => {
    isEscEvent(evt, closeFilmDetails);
  };

  const onFilmCardElementClick = (evt) => {
    evt.preventDefault();
    render(document.body, filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onFilmDetailsEscPress);
    filmDetailsComponent.setCloseClickHandler(onFilmDetailsCloseBtnClick);
  };

  const onFilmDetailsCloseBtnClick = () => {
    closeFilmDetails();
  };

  filmCardComponent.setPopupOpener(onFilmCardElementClick);
  render(container, filmCardComponent, place);
};

const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);
let showingMoviesCount = MOVIES_STARTING_COUNT;

if (movies.length === 0) {
  render(mainMoviesContainer, new NoFilms(), RenderPosition.AFTERBEGIN);
  document.querySelectorAll(`.films-list--extra`).forEach((el) => el.remove());
} else {
  const filmsListSection = document.querySelector(`.films-list`);
  movies.slice(0, showingMoviesCount).forEach((movie) => {
    renderFilmCards(movie, mainMoviesContainer, RenderPosition.BEFOREEND);
  });

  render(filmsListSection, new ShowMoreBtn(), RenderPosition.BEFOREEND);

  const showMore = siteMainElement.querySelector(`.films-list__show-more`);
  showMore.addEventListener(`click`, () => {
    const prevMoviesCount = showingMoviesCount;
    showingMoviesCount = showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

    movies.slice(prevMoviesCount, showingMoviesCount)
    .forEach((movie) => renderFilmCards(movie, mainMoviesContainer, RenderPosition.BEFOREEND));

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
  topRatedMovies.forEach((movie) => renderFilmCards(movie, topRatedContainer, RenderPosition.BEFOREEND));

  const mostCommentedContainer = document.querySelector(`body > main > section > section:nth-child(3) > div`);
  topCommentedMovies.forEach((movie) => renderFilmCards(movie, mostCommentedContainer, RenderPosition.BEFOREEND));
}
