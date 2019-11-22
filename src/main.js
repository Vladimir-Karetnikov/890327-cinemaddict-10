import {createMovieCard} from './components/movie-card.js';
import {createMoviePopup} from './components/movie-popup.js';
import {createMainNav} from './components/main-nav.js';
import {createFilters} from './components/filters.js';
import {createShowMoreBtn} from './components/more-btn.js';
import {createProfile} from './components/profile.js';
import {createFilmsSection} from './components/films-section.js';

const MOVIES_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createProfile(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMainNav(), `beforeend`);
render(siteMainElement, createFilters(), `beforeend`);
render(siteMainElement, createFilmsSection(), `beforeend`);
render(siteMainElement, createMoviePopup(), `beforeend`);

const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);
new Array(MOVIES_COUNT)
  .fill(``)
  .forEach(() => render(mainMoviesContainer, createMovieCard(), `beforeend`));

const filmsListSection = document.querySelector(`.films-list`);
render(filmsListSection, createShowMoreBtn(), `beforeend`);

const topRatedContainer = document.querySelector(`body > main > section > section:nth-child(2) > div`);
new Array(MOVIES_COUNT - 3)
  .fill(``)
  .forEach(() => render(topRatedContainer, createMovieCard(), `beforeend`));

const mostCommentedContainer = document.querySelector(`body > main > section > section:nth-child(3) > div`);
new Array(MOVIES_COUNT - 3)
  .fill(``)
  .forEach(() => render(mostCommentedContainer, createMovieCard(), `beforeend`));

const popupCloseBtn = document.querySelector(`.film-details__close-btn`);
popupCloseBtn.addEventListener(`click`, () => document.querySelector(`.film-details`).remove());

