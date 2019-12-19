import MovieController from '../controllers/movie-controller.js';
import NoFilms from '../components/nofilms-msg.js';
import Sort, {SortType} from "../components/sort.js";
import FilmsSection from '../components/films-section.js';
import ShowMoreBtn from '../components/more-btn.js';
import {render, RenderPosition} from '../utils/render.js';

const MOVIES_STARTING_COUNT = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

const renderFilmCards = (movies, container, onDataChange, onViewChange) => {
  return movies.map((movie) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);
    movieController.render(movie);

    return movieController;
  });
};

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._noDataComponent = new NoFilms();
    this._sortComponent = new Sort();
    this._filmSectionComponent = new FilmsSection();
    this._showMoreBtn = new ShowMoreBtn();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._showingMoviesCount = MOVIES_STARTING_COUNT;
    this._showedMovieControllers = [];
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const movies = this._moviesModel.getMovies();

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmSectionComponent, RenderPosition.BEFOREEND);
    const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);
    let newCards;

    if (movies.length === 0) {
      render(mainMoviesContainer, this._noDataComponent, RenderPosition.AFTERBEGIN);
      document.querySelectorAll(`.films-list--extra`).forEach((el) => el.remove());
    } else {
      this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

      this._renderMovies(movies);

      this._renderLoadMoreButton();

      const topRatedContainer = document.querySelector(`body > main > section > section:nth-child(2) > div`);
      newCards = renderFilmCards(movies.sort((a, b) => b.rating - a.rating).slice(0, 2), topRatedContainer, this._onDataChange, this._onViewChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

      const mostCommentedContainer = document.querySelector(`body > main > section > section:nth-child(3) > div`);
      newCards = renderFilmCards(movies.sort((a, b) => b.commentsAmount - a.commentsAmount).slice(0, 2), mostCommentedContainer, this._onDataChange, this._onViewChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newCards);
    }
  }

  _onDataChange(oldData, newData) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      const sameMovieControllers = this._showedMovieControllers.filter((it) => it._movieCard.movie.id === oldData.id);
      sameMovieControllers.forEach((it)=> it.rerender(isSuccess));
    }
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);

    let sortedMovies = [];
    const movies = this._moviesModel.getMovies();

    switch (sortType) {
      case SortType.DATE:
        sortedMovies = movies.sort((a, b) => b.date.slice(b.date.length - 4) - a.date.slice(a.date.length - 4));
        break;
      case SortType.RATING:
        sortedMovies = movies.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedMovies = movies.slice();
        break;
    }

    mainMoviesContainer.innerHTML = ``;

    this._removeMovies();
    this._renderMovies(sortedMovies);
  }

  _renderLoadMoreButton() {
    this._showMoreBtn.removeElement();
    if (this._showingMoviesCount >= this._moviesModel.getMovies().length) {
      return;
    }
    const filmsListSection = document.querySelector(`.films-list`);

    render(filmsListSection, this._showMoreBtn, RenderPosition.BEFOREEND);

    this._showMoreBtn.getElement().addEventListener(`click`, this._onLoadMoreButtonClick);
  }

  _onFilterChange() {
    this._removeMovies();
    this._renderMovies(this._moviesModel.getMovies().slice(0, MOVIES_STARTING_COUNT));
    this._renderLoadMoreButton();
  }

  _removeMovies() {
    const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);
    mainMoviesContainer.innerHTML = ``;
    this._showedMovieControllers = [];
  }

  _renderMovies(movies) {
    const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);

    let newCards = renderFilmCards(movies.slice(0, MOVIES_STARTING_COUNT), mainMoviesContainer, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newCards);
  }

  _onLoadMoreButtonClick() {
    const prevMoviesCount = MOVIES_STARTING_COUNT;
    const movies = this._moviesModel.getMovies();

    this._showingMoviesCount = this._showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

    this._renderMovies(movies.slice(prevMoviesCount, this._showingMoviesCount));

    if (this._showingMoviesCount >= movies.length) {
      this._showMoreBtn.removeElement();
    }
  }
}
