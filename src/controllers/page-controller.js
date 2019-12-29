import MovieController from '../controllers/movie-controller.js';
import NoFilmsMsg from '../components/nofilms-msg.js';
import Sort, {SortType} from "../components/sort.js";
import FilmsSection from '../components/films-section.js';
import ShowMoreBtn from '../components/show-more-btn.js';
import {render, RenderPosition} from '../utils/render.js';
import FilmsExtra from '../components/films-extra.js';

const MOVIES_STARTING_COUNT = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

const renderFilmCards = (movies, container, onDataChange, onViewChange, api) => {
  return movies.map((movie) => {
    const movieController = new MovieController(container, onDataChange, onViewChange, api);
    movieController.render(movie);

    return movieController;
  });
};

export default class PageController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._noDataComponent = new NoFilmsMsg();
    this._sortComponent = new Sort();
    this._filmSectionComponent = new FilmsSection();
    this._showMoreBtn = new ShowMoreBtn();
    this._activeSortType = SortType.DEFAULT;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
    this._showingMoviesCount = MOVIES_STARTING_COUNT;
    this._showedMovieControllers = [];
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
    this._moviesModel.setSortChangeHandler(this._sortChangeHandler);
    this._api = api;
    this._topRated = null;
    this._mostCommented = null;
  }

  render() {
    const movies = this._moviesModel.getMovies();
    this._sortComponent.setSortTypeChangeHandler(this._onSortChange);
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmSectionComponent, RenderPosition.BEFOREEND);
    const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);

    if (movies.length === 0) {
      render(mainMoviesContainer, this._noDataComponent, RenderPosition.AFTERBEGIN);
      document.querySelectorAll(`.films-list--extra`).forEach((el) => el.remove());
    } else {
      this._renderMovies(movies.slice(0, this._showingMoviesCount));

      this._renderLoadMoreButton();
    }
  }

  _onDataChange(oldData, newData) {
    this._api.updateMovie(oldData.id, newData)
        .then((updatedMovie) => {
          const isSuccess = this._moviesModel.updateMovie(oldData.id, updatedMovie);

          if (isSuccess) {
            const sameMovieControllers = this._showedMovieControllers.filter((it) => it._movieCard.movie.id === oldData.id);
            sameMovieControllers.forEach((it)=> it.rerender(updatedMovie));
            this._renderTopMovies();
          }
        });
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _onSortChange(sortType) {
    this._moviesModel.setSort(sortType);
    this._activeSortType = sortType;
  }

  _sortChangeHandler() {
    this._removeMovies();
    this._renderMovies(this._moviesModel.getMovies().slice(0, this._showingMoviesCount));
    this._renderLoadMoreButton();
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
    this._renderMovies(this._moviesModel.getMovies().slice(0, this._showingMoviesCount));
    this._renderLoadMoreButton();
  }

  _removeMovies() {
    const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);
    mainMoviesContainer.innerHTML = ``;
    if (this._topRated) {
      this._topRated.removeElement();
    }

    if (this._mostCommented) {
      this._mostCommented.removeElement();
    }
    this._showedMovieControllers = [];
  }

  _renderMovies(movies) {
    const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);

    const newCards = renderFilmCards(movies, mainMoviesContainer, this._onDataChange, this._onViewChange, this._api);
    this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

    this._renderTopMovies();
  }

  _renderTopMovies() {
    if (this._topRated) {
      this._topRated.removeElement();
    }

    if (this._mostCommented) {
      this._mostCommented.removeElement();
    }

    const filmsContainer = document.querySelector(`.films`);

    const topRatedCards = this._moviesModel.getMovies().sort((a, b) => b.rating - a.rating).slice(0, 2);

    if (topRatedCards.length > 0) {
      this._topRated = new FilmsExtra(`Top rated`);
      render(filmsContainer, this._topRated, RenderPosition.BEFOREEND);
      const newCards = renderFilmCards(topRatedCards, this._topRated.getElement().querySelector(`.films-list__container`), this._onDataChange, this._onViewChange, this._api);
      this._showedMovieControllers = this._showedMovieControllers.concat(newCards);
    }

    const mostCommentedCards = this._moviesModel.getMovies().sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
    if (mostCommentedCards.length > 0) {
      this._mostCommented = new FilmsExtra(`Most commented`);
      render(filmsContainer, this._mostCommented, RenderPosition.BEFOREEND);
      const newCards = renderFilmCards(mostCommentedCards, this._mostCommented.getElement().querySelector(`.films-list__container`), this._onDataChange, this._onViewChange, this._api);
      this._showedMovieControllers = this._showedMovieControllers.concat(newCards);
    }
  }

  _onLoadMoreButtonClick() {
    const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);
    const prevMoviesCount = this._showingMoviesCount;
    const movies = this._moviesModel.getMovies();

    this._showingMoviesCount = this._showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

    const newCards = renderFilmCards(movies.slice(prevMoviesCount, this._showingMoviesCount), mainMoviesContainer, this._onDataChange, this._onViewChange, this._api);
    this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

    if (this._showingMoviesCount >= movies.length) {
      this._showMoreBtn.removeElement();
    }
  }

  show() {
    document.querySelector(`.sort`).classList.remove(`visually-hidden`);
    document.querySelector(`.films`).classList.remove(`visually-hidden`);
  }

  hide() {
    document.querySelector(`.sort`).classList.add(`visually-hidden`);
    document.querySelector(`.films`).classList.add(`visually-hidden`);
  }
}
