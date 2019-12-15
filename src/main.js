import {movies} from './mock/data.js';
import MainNav from './components/main-nav.js';
import Profile from './components/profile.js';
import Footer from './components/footer.js';
import PageController from './controllers/page-controller.js';
import {render, RenderPosition} from './utils/render.js';

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new MainNav(), RenderPosition.BEFOREEND);
render(document.body, new Footer(), RenderPosition.BEFOREEND);

const Pagecontroller = new PageController(siteMainElement);
Pagecontroller.render(movies);
