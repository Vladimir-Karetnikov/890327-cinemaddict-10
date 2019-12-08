import MainNav from './components/main-nav.js';
import Filters from './components/filters.js';
import Profile from './components/profile.js';
import FilmsSection from './components/films-section.js';
import Footer from './components/footer.js';
import PageController from './controllers/page-controller.js';
import {render, RenderPosition} from './utils/render.js';
import {movies} from './mock/data.js';

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new MainNav(), RenderPosition.BEFOREEND);
render(siteMainElement, new Filters(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsSection(), RenderPosition.BEFOREEND);
render(document.body, new Footer(), RenderPosition.BEFOREEND);

const controller = new PageController();

controller.render(movies);
