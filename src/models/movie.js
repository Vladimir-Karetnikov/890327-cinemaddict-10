export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`] || [];
    if (data[`film_info`]) {
      const movieInfo = Movie.parseMovieInfo(data[`film_info`]);
      this.title = movieInfo.title;
      this.originalTitle = movieInfo.originalTitle;
      this.rating = movieInfo.rating;
      this.poster = movieInfo.poster;
      this.ageRestriction = movieInfo.ageRestriction;
      this.director = movieInfo.director;
      this.writers = movieInfo.writers;
      this.actors = movieInfo.actors;
      this.releaseDate = movieInfo.releaseDate;
      this.country = movieInfo.country;
      this.runtime = movieInfo.runtime;
      this.genres = movieInfo.genres;
      this.description = movieInfo.description;
    }
    if (data[`user_details`]) {
      const userDetail = Movie.parseUserDetail(data[`user_details`]);
      this.userRating = userDetail.userRating;
      this.onWatchList = userDetail.onWatchList;
      this.onHistory = userDetail.onHistory;
      this.watchedDate = userDetail.watchedDate;
      this.onFavorites = userDetail.onFavorites;
    }
  }

  static parseMovieInfo(data) {
    return {
      title: data[`title`] || [],
      originalTitle: data[`alternative_title`] || ``,
      rating: parseInt(data[`total_rating`], 10) || 0,
      runtime: parseInt(data[`runtime`], 10) || 0,
      director: data[`director`] || ``,
      actors: data[`actors`] || [],
      ageRestriction: data[`age_rating`] || 0,
      writers: data[`writers`] || [],
      releaseDate: new Date(data[`release`][`date`]) || null,
      country: data[`release`][`release_country`] || ``,
      genres: data[`genre`] || [],
      poster: data[`poster`] || ``,
      description: data[`description`] || ``,
    };
  }

  static parseUserDetail(data) {
    return {
      onFavorites: Boolean(data[`favorite`]),
      userRating: parseInt(data[`personal_rating`], 10) || 0,
      onWatchList: Boolean(data[`watchlist`]),
      watchedDate: new Date(data[`watching_date`]) || null,
      onHistory: Boolean(data[`already_watched`])
    };
  }

  toRAW() {
    const commentsID = [];
    this.comments.forEach((comment) => commentsID.push(comment.id));

    return {
      'id': this.id,
      'comments': commentsID,
      'film_info': {
        'title': this.title,
        'alternative_title': this.originalTitle,
        'total_rating': this.rating,
        'poster': this.poster,
        'age_rating': this.ageRestriction,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': new Date(this.releaseDate).toISOString(),
          'release_country': this.country,
        },
        'runtime': this.runtime,
        'genre': this.genres,
        'description': this.description,
      },
      'user_details': {
        'personal_rating': this.userRating,
        'watchlist': this.onWatchList,
        'already_watched': this.onHistory,
        'watching_date': new Date(this.watchedDate).toISOString(),
        'favorite': this.onFavorites,
      }
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }
}
