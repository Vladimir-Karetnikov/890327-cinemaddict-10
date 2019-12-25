import MovieCard from '../components/movie-card.js';
import MoviePopup from '../components/movie-popup.js';
import {render, RenderPosition, isEscEvent} from '../utils/render.js';
import he from 'he';
import moment from 'moment';
import Movie from '../models/movie.js';

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onFilmDetailsEscPress = this._onFilmDetailsEscPress.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._onFilmCardElementClick = this._onFilmCardElementClick.bind(this);

    this._movieCard = null;
    this._MoviePopup = null;
  }

  render(movie) {
    this._movieCard = new MovieCard(movie);
    this._MoviePopup = new MoviePopup(movie);

    render(this._container, this._movieCard, RenderPosition.BEFOREEND);
    this._setComponentsClickHandlers(movie);
  }

  rerender(movie) {
    const oldMovieCard = this._movieCard;
    const oldMoviePopup = this._MoviePopup;

    this._movieCard = new MovieCard(movie);
    this._MoviePopup = new MoviePopup(movie);

    this._movieCard.rerender(oldMovieCard);
    this._MoviePopup.rerender(oldMoviePopup);
    this._MoviePopup.setCloseClickHandler(this._closeFilmDetails);
    this._setComponentsClickHandlers(movie);
  }

  _setComponentsClickHandlers(movie) {
    this._movieCard.setPopupOpener(this._onFilmCardElementClick);
    this._MoviePopup.onEmojiClick();

    this._movieCard.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      const updatedMovie = new Movie({});
      Object.assign(updatedMovie, movie, {onWatchList: !movie.onWatchList});

      this._onDataChange(movie, updatedMovie);
    });

    this._movieCard.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      const updatedMovie = new Movie({});
      Object.assign(updatedMovie, movie, {
        onHistory: !movie.onHistory,
        userRating: movie.onHistory ? movie.userRating : 0,
        watchedDate: !movie.onHistory ? moment() : null
      });

      this._onDataChange(movie, updatedMovie);
    });

    this._movieCard.setFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      const updatedMovie = new Movie({});
      Object.assign(updatedMovie, movie, {
        onFavorites: !movie.onFavorites
      });
      this._onDataChange(movie, updatedMovie);
    });

    this._MoviePopup.setWatchlistInputClickHandler((evt) => {
      evt.preventDefault();
      const updatedMovie = new Movie({});
      Object.assign(updatedMovie, movie, {onWatchList: !movie.onWatchList});

      this._onDataChange(movie, updatedMovie);
    });

    this._MoviePopup.setWatchedInputClickHandler((evt) => {
      evt.preventDefault();
      const updatedMovie = new Movie({});
      Object.assign(updatedMovie, movie, {
        onHistory: !movie.onHistory,
        userRating: movie.onHistory ? movie.userRating : 0,
        watchedDate: !movie.onHistory ? moment() : null
      });

      this._onDataChange(movie, updatedMovie);
    });

    this._MoviePopup.setFavoritesInputClickHandler((evt) => {
      evt.preventDefault();
      const updatedMovie = new Movie({});
      Object.assign(updatedMovie, movie, {
        onFavorites: !movie.onFavorites
      });
      this._onDataChange(movie, updatedMovie);
    });

    this._MoviePopup.setDeleteCommentButtonHandler((evt) => {
      evt.preventDefault();

      const comment = evt.target.closest(`.film-details__comment`);

      if (!comment) {
        return;
      }

      const index = Array.from(this._MoviePopup.getElement().querySelectorAll(`.film-details__comment-delete`))
        .findIndex((item) => item === comment);

      movie.comments.splice(index, 1);

      this._onDataChange(movie, Object.assign({}, movie));

      comment.remove();
    });

    this._MoviePopup.setFormHandler((evt) => {
      if (evt.ctrlKey && evt.key === `Enter`) {
        const data = new Map(new FormData(evt.target.form));


        const comment = data.get(`comment`);
        const emoji = this._MoviePopup._emoji;

        if (comment && emoji) {
          movie.comments.unshift({
            img: emoji,
            text: he.encode(comment),
            author: `John Doe`,
            day: new Date()
          });

          this._onDataChange(movie, Object.assign({}, movie));
        }
      }
    });

    this._MoviePopup.setRatingHandler((evt) => {
      let newRating = parseInt(evt.target.value, 10);
      const updatedMovie = new Movie({});
      Object.assign(updatedMovie, movie, {
        userRating: newRating
      });
      this._onDataChange(movie, updatedMovie);
    });

    this._MoviePopup.setRatingResetHandler((evt) => {
      evt.preventDefault();
      const updatedMovie = new Movie({});
      Object.assign(updatedMovie, movie, {
        userRating: 0
      });
      this._onDataChange(movie, updatedMovie);
    });
  }

  _closeFilmDetails() {
    this._MoviePopup.getElement().remove();
    document.removeEventListener(`keydown`, this._onFilmDetailsEscPress);
  }

  _onFilmDetailsEscPress(evt) {
    isEscEvent(evt, this._closeFilmDetails);
  }

  _onFilmCardElementClick(evt) {
    evt.preventDefault();

    this._onViewChange();
    render(document.body, this._MoviePopup, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onFilmDetailsEscPress);
    this._MoviePopup.setCloseClickHandler(this._closeFilmDetails);
  }

  setDefaultView() {
    this._closeFilmDetails();
  }
}
