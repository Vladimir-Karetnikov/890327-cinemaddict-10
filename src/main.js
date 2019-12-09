import {movies} from './mock/data.js';
import MainNav from './components/main-nav.js';
import Profile from './components/profile.js';
import Footer from './components/footer.js';
import PageController from './controllers/page-controller.js';
import ShowMoreBtn from './components/more-btn.js';
import {render, RenderPosition} from './utils/render.js';

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new MainNav(), RenderPosition.BEFOREEND);
render(document.body, new Footer(), RenderPosition.BEFOREEND);
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;
let showingMoviesCount = 5;

const controller = new PageController(siteMainElement);
controller.render(movies);

const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);
const filmsListSection = document.querySelector(`.films-list`);
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
