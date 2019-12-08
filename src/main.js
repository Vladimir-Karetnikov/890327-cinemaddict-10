import {movies} from './mock/data.js';
import MainNav from './components/main-nav.js';
import Profile from './components/profile.js';
import Footer from './components/footer.js';
import PageController from './controllers/page-controller.js';
import Sort, {SortType} from "./components/sort.js";
import FilmsSection from './components/films-section.js';
import ShowMoreBtn from './components/more-btn.js';
import {render, RenderPosition} from './utils/render.js';

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new MainNav(), RenderPosition.BEFOREEND);
const sortComponent = new Sort();
render(siteMainElement, sortComponent, RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsSection(), RenderPosition.BEFOREEND);
render(document.body, new Footer(), RenderPosition.BEFOREEND);
const controller = new PageController(siteMainElement);
const filmsListSection = document.querySelector(`.films-list`);
const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;
const defaultList = movies.slice();
let showingMoviesCount = 5;

controller.render(movies);

sortComponent.setSortTypeChangeHandler((sortType) => {
  const filmsLoaded = mainMoviesContainer.querySelectorAll(`.films-list .film-card`).length;
  switch (sortType) {
    case SortType.DATE:
      movies.sort((a, b) => b.date.slice(b.date.length - 4) - a.date.slice(a.date.length - 4));
      break;
    case SortType.RATING:
      movies.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      movies = defaultList.slice();
      break;
  }

  mainMoviesContainer.innerHTML = ``;

  movies.slice(0, filmsLoaded).forEach((movie) => {
    controller.renderFilmCards(movie, mainMoviesContainer, RenderPosition.BEFOREEND);
  });
});

render(filmsListSection, new ShowMoreBtn(), RenderPosition.BEFOREEND);
const showMore = siteMainElement.querySelector(`.films-list__show-more`);
showMore.addEventListener(`click`, () => {
  const prevMoviesCount = showingMoviesCount;
  showingMoviesCount = showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

  movies.slice(prevMoviesCount, showingMoviesCount)
  .forEach((movie) => controller.renderFilmCards(movie, mainMoviesContainer, RenderPosition.BEFOREEND));

  if (showingMoviesCount >= movies.length) {
    showMore.remove();
  }
});
