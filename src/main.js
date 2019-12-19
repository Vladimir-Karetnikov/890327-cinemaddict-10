import {movies} from './mock/data.js';
import MoviesModel from './models/movies.js';
import FilterController from './controllers/filter-controller.js';
import Profile from './components/profile.js';
import Footer from './components/footer.js';
import PageController from './controllers/page-controller.js';
import {render, RenderPosition} from './utils/render.js';

const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
const siteMainElement = document.querySelector(`.main`);

const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

render(document.body, new Footer(), RenderPosition.BEFOREEND);

const Pagecontroller = new PageController(siteMainElement, moviesModel);
Pagecontroller.render();
