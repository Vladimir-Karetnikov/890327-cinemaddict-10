import {movies} from './mock/data.js';
import MoviesModel from './models/movies.js';
import FilterController from './controllers/filter-controller.js';
import Profile from './components/profile.js';
import Footer from './components/footer.js';
import PageController from './controllers/page-controller.js';
import Stats from './components/stats.js';
import {render, RenderPosition} from './utils/render.js';

const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new Profile(moviesModel), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);
const statsComponent = new Stats(moviesModel);

const filterController = new FilterController(siteMainElement, moviesModel);
filterController.setPageChangeHandler(() => {
  pageController.hide();
  statsComponent.show();
  statsComponent.renderChart();
}, () => {
  pageController.show();
  statsComponent.hide();
});
filterController.render();

render(document.body, new Footer(), RenderPosition.BEFOREEND);

const pageController = new PageController(siteMainElement, moviesModel);

pageController.render();
render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
