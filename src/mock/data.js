const MOVIES_COUNT = 15;

const titles = [
  `Citizen Kane`,
  `The Godfather`,
  `Lawrence of Arabia`,
  `The Wizard of Oz`,
  `The Graduate`,
  `On the Waterfront`,
  `Schindler's List`,
  `Singin' in the Rain`,
  `It's a Wonderful Life`,
  `Sunset Boulevard`,
  `The Bridge on the River Kwai`,
  `Some Like It Hot`,
  `Star Wars`,
  `Gone with the Wind`,
  `Casablanca`
];

const directors = [
  `Khalik Allah`,
  `Marc Allégret`,
  `Yves Allégret`,
  `Elizabeth Allen`,
  `Irwin Allen`,
  `Lewis Allen`,
  `Woody Allen`,
  `Sherman Alexie`,
  `Syed Ali Raza Usama`,
  `Pedro Almodóvar`,
  `Paul Almond`,
  `Robert Altman`,
  `Fede Alvarez`,
  `Mathieu Amalric`,
  `Ned Ambler`
];

const writers = [
  `James D. Macdonald`,
  `John D. MacDonald`,
  `F. Gwynplaine MacIntyre`,
  `R. W. Mackelworth`,
  `Katherine MacLean`,
  `Ian R. MacLeod`,
  `Ken MacLeod`,
  `Angus MacVicar`,
  `Tom Maddox`,
  `Charles Eric Maine`,
  `Donald Malcolm`,
  `Daryl F. Mallett`,
  `Barry N. Malzberg`,
  `George Mann`,
  `Laurence Manning`,
  `Leo Margulies`,
  `Stephen Marley`,
  `Paul Marlowe`,
  `George R. R. Martin`,
  `David Marusek`,
  `Richard Matheson`,
  `Susan R. Matthews`,
  `Julian May`,
  `Ged Maybury`,
  `Paul J. McAuley`,
  `Ed McBain`,
  `Anne McCaffrey`,
  `Wil McCarthy`,
  `David McDaniel`,
  `Jack McDevitt`,
  `Ian McDonald`,
  `William P. McGivern`,
  `Maureen F. McHugh`,
  `J. T. McIntosh`,
  `Vonda N. McIntyre`,
  `Darko Macan`
];

const monthNames = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const countrys = [
  `Malawi`,
  `Malaysia`,
  `Maldives`,
  `Mali`,
  `Malta`,
  `Marshall Islands`,
  `Mauritania`,
  `Mauritius`,
  `Mexico`,
  `Micronesia`,
  `Moldova`,
  `Monaco`,
  `Mongolia`,
  `Montenegro`,
  `Morocco`,
  `Mozambique`,
  `Madagascar`
];

const genres = [
  `Science fiction`,
  `Western`,
  `Romance`,
  `Thriller`,
  `Mystery`,
  `Detective`,
  `Dystopia`,
  `Fantasy`
];

const description = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

const posters = [
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];

const comments = [
  {
    img: `./images/emoji/smile.png`,
    text: `Interesting setting and a good cast`,
    author: `Tim Macoveev`,
    day: `3 days ago`
  },
  {
    img: `./images/emoji/sleeping.png`,
    text: `Booooooooooring`,
    author: `John Doe`,
    day: `2 days ago`
  },
  {
    img: `./images/emoji/puke.png`,
    text: `Very very old. Meh`,
    author: `John Doe`,
    day: `2 days ago`
  },
  {
    img: `./images/emoji/angry.png`,
    text: `Almost two hours? Seriously?`,
    author: `John Doe`,
    day: `Today`
  }
];

const emojiList = [
  {
    id: `emoji-smile`,
    value: `sleeping`,
    img: `./images/emoji/smile.png`
  },
  {
    id: `emoji-sleeping`,
    value: `neutral-face`,
    img: `./images/emoji/sleeping.png`
  },
  {
    id: `emoji-gpuke`,
    value: `grinning`,
    img: `./images/emoji/puke.png`
  },
  {
    id: `emoji-angry`,
    value: `grinning`,
    img: `./images/emoji/angry.png`
  }
];

const controlsTypes = {
  watchlist: `Add to watchlist`,
  watched: `Already watched`,
  favorite: `Add to favorites`,
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);
  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const compareRandom = () => {
  return Math.random() - 0.5;
};

const generateMovieCard = () => {
  return {
    title: getRandomArrayItem(titles),
    originalTitle: getRandomArrayItem(titles),
    rating: getRandomIntegerNumber(0, 9),
    userRating: getRandomIntegerNumber(0, 9),
    director: getRandomArrayItem(directors),
    writers: writers.sort(compareRandom).slice(0, getRandomIntegerNumber(1, 3)),
    actors: writers.sort(compareRandom).slice(0, getRandomIntegerNumber(1, 5)),
    date: `${getRandomIntegerNumber(0, 30)} ${getRandomArrayItem(monthNames)} ${getRandomIntegerNumber(1950, 2019)}`,
    runtime: `1h ${getRandomIntegerNumber(1, 59)}m`,
    country: getRandomArrayItem(countrys),
    genres: genres.sort(compareRandom).slice(0, getRandomIntegerNumber(1, 3)),
    description: description.sort(compareRandom).slice(0, getRandomIntegerNumber(1, description.length - 1)),
    poster: getRandomArrayItem(posters),
    ageRestriction: `${getRandomIntegerNumber(0, 18)}+`,
    commentsAmount: getRandomIntegerNumber(0, 100),
    comments: comments.sort(compareRandom).slice(0, getRandomIntegerNumber(1, comments.length - 1)),
    onWatchList: Math.random() >= 0.5,
    onHistory: Math.random() >= 0.5,
    onFavorites: Math.random() >= 0.5
  };
};

const generateMovieCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateMovieCard);
};

const movies = generateMovieCards(MOVIES_COUNT);

const rank = getRandomIntegerNumber(0, 30);
let rankName;

switch (true) {
  case 0:
    rankName = ``;
    break;
  case rank >= 1 && rank <= 10:
    rankName = `novice`;
    break;
  case rank >= 11 && rank <= 21:
    rankName = `fan`;
    break;
  case rank >= 21:
    rankName = `movie buff`;
    break;
}

const inWatchlist = movies.reduce((acc, movie) => movie.onWatchList === true ? ++acc : acc, 0);
const inHistory = movies.reduce((acc, movie) => movie.onHistory === true ? ++acc : acc, 0);
const inFavorites = movies.reduce((acc, movie) => movie.onFavorites === true ? ++acc : acc, 0);

const menuTypes = [
  {
    'title': `All movies`,
    'link': `all`,
    'filmsCount': movies.length,
    'modifiers': []
  },
  {
    'title': `Watchlist`,
    'link': `watchlist`,
    'filmsCount': inWatchlist,
    'modifiers': []
  },
  {
    'title': `History`,
    'link': `history`,
    'filmsCount': inHistory,
    'modifiers': []
  },
  {
    'title': `Favorites`,
    'link': `favorites`,
    'filmsCount': inFavorites,
    'modifiers': []
  },
  {
    'title': `Stats`,
    'link': `stats`,
    'filmsCount': rank,
    'modifiers': [
      `additional`,
      `active`
    ]
  }
];

const compareRating = (b, a) => {
  const first = a.rating;
  const second = b.rating;

  let comparison = 0;
  if (first > second) {
    comparison = 1;
  } else if (first < second) {
    comparison = -1;
  }
  return comparison;
};

const compareComments = (b, a) => {
  const first = a.commentsAmount;
  const second = b.commentsAmount;

  let comparison = 0;
  if (first > second) {
    comparison = 1;
  } else if (first < second) {
    comparison = -1;
  }
  return comparison;
};

const topRatedMovies = movies.sort(compareRating).slice(0, 2);
const topCommentedMovies = movies.sort(compareComments).slice(0, 2);

export {generateMovieCard, movies, rankName, menuTypes, emojiList, controlsTypes, topRatedMovies, topCommentedMovies};
