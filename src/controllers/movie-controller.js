import MovieCard from '../components/movie-card.js';
import MoviePopup from '../components/movie-popup.js';
import {render, RenderPosition, isEscEvent} from '../utils/render.js';
import he from 'he';
import moment from 'moment';
import Movie from '../models/movie.js';
import Comments from '../models/comments.js';
import CommentsComponent from '../components/commentsComponent.js';

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;
    this._onFilmDetailsEscPress = this._onFilmDetailsEscPress.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._onFilmCardElementClick = this._onFilmCardElementClick.bind(this);
    this._movie = null;

    this._movieCard = null;
    this._MoviePopup = null;
    this._commentsSection = null;
  }

  render(movie) {
    this._movie = movie;
    this._movieCard = new MovieCard(movie);
    this._MoviePopup = new MoviePopup(movie);

    render(this._container, this._movieCard, RenderPosition.BEFOREEND);
    this._setComponentsClickHandlers(movie);
  }

  rerender(movie) {
    this._movie = movie;
    const oldMovieCard = this._movieCard;
    const oldMoviePopup = this._MoviePopup;

    this._movieCard = new MovieCard(movie);
    this._MoviePopup = new MoviePopup(movie);

    this._movieCard.rerender(oldMovieCard);
    this._MoviePopup.rerender(oldMoviePopup);
    this._MoviePopup.setCloseClickHandler(this._closeFilmDetails);
    this._setComponentsClickHandlers(movie);
    if (this._commentsSection) {
      this._commentsSection.removeElement();
      this._api.getComments(movie.id)
    .then((comments) => {
      this._commentsSection = new CommentsComponent(comments);

      this._commentsSection.setDeleteCommentButtonHandler((delEvt) => {
        delEvt.preventDefault();
        this._api.deleteComment(delEvt.target.dataset.id)
          .then(() => this._onDataChange(movie, movie));
      });

      const commentsContainer = this._MoviePopup.getElement().querySelector(`.film-details__comments-wrap`);

      render(commentsContainer, this._commentsSection, RenderPosition.AFTERBEGIN);
    });

    }
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

    this._MoviePopup.setFormHandler((evt) => {
      if (evt.ctrlKey && evt.key === `Enter`) {
        const data = new Map(new FormData(evt.target.form));


        const comment = he.encode(data.get(`comment`));
        const emoji = this._MoviePopup._emoji;
        if (comment && emoji) {
          this._MoviePopup.getElement().querySelector(`.film-details__comment-input`).style.outline = `none`;
          this._MoviePopup.disableForm();
          const newComment = new Comments({});
          Object.assign(newComment, {
            img: emoji,
            text: comment,
            day: moment()
          });
          this._api.createComment(movie.id, newComment)
          .then(() => this._onDataChange(movie, movie))
          .catch(() => {
            this._MoviePopup.getElement().classList.add(`shake`);
            this._MoviePopup.activateForm();
            this._MoviePopup.getElement().querySelector(`.film-details__comment-input`).style.outline = `4px solid #cc0000`;
          });
        }
      }
    });

    this._MoviePopup.setRatingHandler((evt) => {
      let newRating = parseInt(evt.target.value, 10);
      const updatedMovie = new Movie({});
      Object.assign(updatedMovie, movie, {
        userRating: newRating
      });
      this._MoviePopup.disableRating();
      this._api.updateMovie(movie.id, updatedMovie)
      .then(() => {
        this._onDataChange(movie, updatedMovie);
      })
      .catch(() => {
        this._MoviePopup.getElement().classList.add(`shake`);
        this._MoviePopup.activateRating();
        evt.target.labels[0].style.backgroundColor = `#cc0000`;
      });
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
    if (!this._commentsSection) {
      this._api.getComments(this._movie.id)
        .then((comments) => {
          this._commentsSection = new CommentsComponent(comments);

          this._commentsSection.setDeleteCommentButtonHandler((delEvt) => {
            delEvt.preventDefault();
            delEvt.path[3].style.color = `grey`;
            this._api.deleteComment(delEvt.target.dataset.id)
              .then(() => this._onDataChange(this._movie, this._movie));
          });


          const commentsContainer = this._MoviePopup.getElement().querySelector(`.film-details__comments-wrap`);

          render(commentsContainer, this._commentsSection, RenderPosition.AFTERBEGIN);
        });
    }
  }

  setDefaultView() {
    this._closeFilmDetails();
  }
}
