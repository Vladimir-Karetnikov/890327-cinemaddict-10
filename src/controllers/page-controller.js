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
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      const sameMovieControllers = this._showedMovieControllers.filter((it) => it._movieCard.movie.id === oldData.id);
      sameMovieControllers.forEach((it)=> it.rerender(isSuccess));
      this._renderTopMovies();
    }
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
    const topRatedContainer = document.querySelector(`body > main > section > section:nth-child(2) > div`);
    const mostCommentedContainer = document.querySelector(`body > main > section > section:nth-child(3) > div`);
    mainMoviesContainer.innerHTML = ``;
    topRatedContainer.innerHTML = ``;
    mostCommentedContainer.innerHTML = ``;
    this._showedMovieControllers = [];
  }

  _renderMovies(movies) {
    const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);

    let newCards = renderFilmCards(movies, mainMoviesContainer, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

    this._renderTopMovies();
  }

  _renderTopMovies() {
    const topRatedContainer = document.querySelector(`body > main > section > section:nth-child(2) > div`);
    const mostCommentedContainer = document.querySelector(`body > main > section > section:nth-child(3) > div`);
    topRatedContainer.innerHTML = ``;
    mostCommentedContainer.innerHTML = ``;
    const extraMovies = this._moviesModel.getMovies();

    let newCards = renderFilmCards(extraMovies.sort((a, b) => b.rating - a.rating).slice(0, 2), topRatedContainer, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

    newCards = renderFilmCards(extraMovies.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2), mostCommentedContainer, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newCards);
  }

  _onLoadMoreButtonClick() {
    const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);
    const prevMoviesCount = this._showingMoviesCount;
    const movies = this._moviesModel.getMovies();

    this._showingMoviesCount = this._showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

    let newCards = renderFilmCards(movies.slice(prevMoviesCount, this._showingMoviesCount), mainMoviesContainer, this._onDataChange, this._onViewChange);
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
