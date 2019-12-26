import API from './api.js';
import MoviesModel from './models/movies.js';
import FilterController from './controllers/filter-controller.js';
import Profile from './components/profile.js';
import Footer from './components/footer.js';
import PageController from './controllers/page-controller.js';
import Stats from './components/stats.js';
import {render, RenderPosition} from './utils/render.js';

const AUTHORIZATION = `Basic YaM6fdkBq8ZbyNh`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();

const siteHeaderElement = document.querySelector(`.header`);

const siteMainElement = document.querySelector(`.main`);
const filterController = new FilterController(siteMainElement, moviesModel);

render(document.body, new Footer(), RenderPosition.BEFOREEND);
const pageController = new PageController(siteMainElement, moviesModel, api);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);

    const statsComponent = new Stats(moviesModel);

    filterController.setPageChangeHandler((evt) => {
      if (evt.target.classList.contains(`main-navigation__item--additional`)) {
        pageController.hide();
        statsComponent.show();
        statsComponent.renderChart();
      } else {
        pageController.show();
        statsComponent.hide();
      }
    });

    render(siteHeaderElement, new Profile(moviesModel), RenderPosition.BEFOREEND);
    filterController.render();
    pageController.render();
    render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
  });
