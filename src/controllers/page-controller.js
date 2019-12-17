import MovieController from '../controllers/movie-controller.js';
import NoFilms from '../components/nofilms-msg.js';
import Sort, {SortType} from "../components/sort.js";
import FilmsSection from '../components/films-section.js';
import ShowMoreBtn from '../components/more-btn.js';
import {render, RenderPosition} from '../utils/render.js';

const renderFilmCards = (movies, container, onDataChange, onViewChange) => {
  return movies.map((movie) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);
    movieController.render(movie);

    return movieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._noDataComponent = new NoFilms();
    this._sortComponent = new Sort();
    this._filmSectionComponent = new FilmsSection();
    this._showMoreBtn = new ShowMoreBtn();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._movies = [];
    this._showedMovieControllers = [];
  }

  render(movies) {
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmSectionComponent, RenderPosition.BEFOREEND);
    const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);
    const MOVIES_STARTING_COUNT = 5;
    this._movies = movies;
    const defaultList = this._movies.slice();
    let newCards;

    if (this._movies.length === 0) {
      render(mainMoviesContainer, this._noDataComponent, RenderPosition.AFTERBEGIN);
      document.querySelectorAll(`.films-list--extra`).forEach((el) => el.remove());
    } else {
      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        const filmsLoaded = mainMoviesContainer.querySelectorAll(`.films-list .film-card`).length;

        switch (sortType) {
          case SortType.DATE:
            this._movies.sort((a, b) => b.date.slice(b.date.length - 4) - a.date.slice(a.date.length - 4));
            break;
          case SortType.RATING:
            this._movies.sort((a, b) => b.rating - a.rating);
            break;
          case SortType.DEFAULT:
            this._movies = defaultList.slice();
            break;
        }

        mainMoviesContainer.innerHTML = ``;

        newCards = renderFilmCards(this._movies.slice(0, filmsLoaded), mainMoviesContainer, this._onDataChange, this._onViewChange);
        this._showedMovieControllers = this._showedMovieControllers.concat(newCards);
      });

      newCards = renderFilmCards(this._movies.slice(0, MOVIES_STARTING_COUNT), mainMoviesContainer, this._onDataChange, this._onViewChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

      const filmsListSection = document.querySelector(`.films-list`);
      const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;
      let showingMoviesCount = 5;

      render(filmsListSection, this._showMoreBtn, RenderPosition.BEFOREEND);

      this._showMoreBtn.getElement().addEventListener(`click`, () => {
        const prevMoviesCount = showingMoviesCount;
        showingMoviesCount = showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

        newCards = renderFilmCards(this._movies.slice(prevMoviesCount, showingMoviesCount), mainMoviesContainer, this._onDataChange, this._onViewChange);
        this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

        if (showingMoviesCount >= movies.length) {
          this._showMoreBtn.removeElement();
        }
      });

      const topRatedContainer = document.querySelector(`body > main > section > section:nth-child(2) > div`);
      newCards = renderFilmCards(this._movies.sort((a, b) => b.rating - a.rating).slice(0, 2), topRatedContainer, this._onDataChange, this._onViewChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

      const mostCommentedContainer = document.querySelector(`body > main > section > section:nth-child(3) > div`);
      newCards = renderFilmCards(this._movies.sort((a, b) => b.commentsAmount - a.commentsAmount).slice(0, 2), mostCommentedContainer, this._onDataChange, this._onViewChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newCards);
    }
  }

  _onDataChange(oldData, newData) {
    const index = this._movies.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    const sameMovieControllers = this._showedMovieControllers.filter((it) => it._movieCard.movie === oldData);
    this._movies = [].concat(this._movies.slice(0, index), newData, this._movies.slice(index + 1));

    sameMovieControllers.forEach((it)=> it.rerender(this._movies[index]));
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }
}
