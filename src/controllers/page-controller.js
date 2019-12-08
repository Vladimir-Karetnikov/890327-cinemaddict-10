import Sort, {SortType} from "../components/sort.js";
import FilmsSection from '../components/films-section.js';
import MovieCard from '../components/movie-card.js';
import MoviePopup from '../components/movie-popup.js';
import ShowMoreBtn from '../components/more-btn.js';
import NoFilms from '../components/nofilms-msg.js';
import {render, RenderPosition, KeyCodes, remove} from '../utils/render.js';
import {topRatedMovies, topCommentedMovies} from '../mock/data.js';

export default class PageController {
  constructor(container) {
    this._container = container;
    this._noDataComponent = new NoFilms();
    this._sortComponent = new Sort();
    this._filmSectionComponent = new FilmsSection();
    this._showMoreButtonComponent = new ShowMoreBtn();
  }

  renderFilmCards(movie, container, place) {
    const filmCardComponent = new MovieCard(movie);
    const filmDetailsComponent = new MoviePopup(movie);

    const isEscEvent = (evt, action) => {
      if (evt.keyCode === KeyCodes.ESC) {
        action();
      }
    };

    const closeFilmDetails = () => {
      remove(filmDetailsComponent);
      document.removeEventListener(`keydown`, onFilmDetailsEscPress);
    };

    const onFilmDetailsEscPress = (evt) => {
      isEscEvent(evt, closeFilmDetails);
    };

    const onFilmCardElementClick = (evt) => {
      evt.preventDefault();
      render(document.body, filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onFilmDetailsEscPress);
      filmDetailsComponent.setCloseClickHandler(onFilmDetailsCloseBtnClick);
    };

    const onFilmDetailsCloseBtnClick = () => {
      closeFilmDetails();
    };

    filmCardComponent.setPopupOpener(onFilmCardElementClick);
    render(container, filmCardComponent, place);
  }

  render(movies) {
    const MOVIES_STARTING_COUNT = 5;
    const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;
    const siteMainElement = document.querySelector(`.main`);

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmSectionComponent, RenderPosition.BEFOREEND);

    const mainMoviesContainer = document.querySelector(`.films-list > .films-list__container`);
    if (movies.length === 0) {
      render(mainMoviesContainer, this._noDataComponent, RenderPosition.AFTERBEGIN);
      document.querySelectorAll(`.films-list--extra`).forEach((el) => el.remove());
    } else {
      const filmsListSection = document.querySelector(`.films-list`);
      const defaultList = movies.slice();
      let showingMoviesCount = MOVIES_STARTING_COUNT;

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        const filmsLoaded = mainMoviesContainer.querySelectorAll(`.films-list .film-card`).length;

        switch (sortType) {
          case SortType.DATE:
            movies.sort((a, b) => b.date.slice(b.date.length - 4) - a.date.slice(a.date.length - 4));
            break;
          case SortType.RATING:
            movies.sort((a, b) => b.rating - a.rating);
            break;
          case SortType.DEFAULT:
            movies = defaultList.slice();
            break;
        }

        mainMoviesContainer.innerHTML = ``;

        movies.slice(0, filmsLoaded).forEach((movie) => {
          this.renderFilmCards(movie, mainMoviesContainer, RenderPosition.BEFOREEND);
        });
      });

      movies.slice(0, MOVIES_STARTING_COUNT).forEach((movie) => {
        this.renderFilmCards(movie, mainMoviesContainer, RenderPosition.BEFOREEND);
      });

      render(filmsListSection, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      const showMore = siteMainElement.querySelector(`.films-list__show-more`);
      showMore.addEventListener(`click`, () => {
        const prevMoviesCount = showingMoviesCount;
        showingMoviesCount = showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

        movies.slice(prevMoviesCount, showingMoviesCount)
        .forEach((movie) => this.renderFilmCards(movie, mainMoviesContainer, RenderPosition.BEFOREEND));

        if (showingMoviesCount >= movies.length) {
          showMore.remove();
        }
      });

      const topRatedContainer = document.querySelector(`body > main > section > section:nth-child(2) > div`);
      topRatedMovies.forEach((movie) => this.renderFilmCards(movie, topRatedContainer, RenderPosition.BEFOREEND));

      const mostCommentedContainer = document.querySelector(`body > main > section > section:nth-child(3) > div`);
      topCommentedMovies.forEach((movie) => this.renderFilmCards(movie, mostCommentedContainer, RenderPosition.BEFOREEND));
    }
  }
}
