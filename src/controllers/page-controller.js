export default class PageController {
  constructor(container) {
    this._container = container;

    this._noDataComponent = new NoFilms();
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

  }
}
