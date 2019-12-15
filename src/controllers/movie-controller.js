import MovieCard from '../components/movie-card.js';
import MoviePopup from '../components/movie-popup.js';
import {render, RenderPosition, KeyCodes, replaceComponent} from '../utils/render.js';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._movieCard = null;
    this._MoviePopup = null;
  }

  render(movie) {
    const oldMovieCard = this._movieCard;
    const oldMoviePopup = this._MoviePopup;

    this._movieCard = new MovieCard(movie);
    this._MoviePopup = new MoviePopup(movie);

    const closeFilmDetails = () => {
      this._MoviePopup.removeElement();
      document.removeEventListener(`keydown`, onFilmDetailsEscPress);
    };

    const onFilmDetailsEscPress = (evt) => {
      if (evt.keyCode === KeyCodes.ESC) {
        closeFilmDetails();
      }
    };

    const onFilmDetailsCloseBtnClick = () => {
      closeFilmDetails();
    };

    if (oldMoviePopup && oldMovieCard) {
      replaceComponent(this._movieCard, oldMovieCard);
      replaceComponent(this._MoviePopup, oldMoviePopup);
      this._MoviePopup.setCloseClickHandler(onFilmDetailsCloseBtnClick);
    } else {
      render(this._container, this._movieCard, RenderPosition.BEFOREEND);
    }

    const onFilmCardElementClick = (evt) => {
      evt.preventDefault();
      render(document.body, this._MoviePopup, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onFilmDetailsEscPress);
      this._MoviePopup.setCloseClickHandler(onFilmDetailsCloseBtnClick);
    };

    this._movieCard.setPopupOpener(onFilmCardElementClick);
    this._movieCard.setWatchlistButtonActiveClass();
    this._movieCard.setWatchedButtonActiveClass();
    this._movieCard.setFavoritesButtonActiveClass();

    this._movieCard.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        onWatchList: !movie.onWatchList
      }));
    });

    this._movieCard.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        onHistory: !movie.onHistory
      }));
    });

    this._movieCard.setFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        onFavorites: !movie.onFavorites
      }));
    });

    this._MoviePopup.setWatchlistInputClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        onWatchList: !movie.onWatchList
      }));
    });

    this._MoviePopup.setWatchedInputClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        onHistory: !movie.onHistory
      }));
    });

    this._MoviePopup.setFavoritesInputClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        onFavorites: !movie.onFavorites
      }));
    });
  }
}
