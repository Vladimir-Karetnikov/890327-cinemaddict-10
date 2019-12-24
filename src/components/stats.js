import AbstractComponent from './abstract-component.js';
import Chart from 'chart.js';
import chartjsPlugin from 'chartjs-plugin-datalabels';
import moment from 'moment';

const getWeekData = (data) => {
  const end = moment();
  const start = end.subtract(7, `d`);
  const returningData = [...data];
  return returningData.filter((el) => el.watchedDate > start);
};
const getTodayData = (data) => {
  const end = moment();
  const start = end.startOf(`day`);
  const returningData = [...data];
  return returningData.filter((el) => el.watchedDate > start);
};
const getYearData = (data) => {
  const end = moment();
  const start = end.subtract(365, `d`);
  const returningData = [...data];
  return returningData.filter((el) => el.watchedDate > start);
};
const getMonthData = (data) => {
  const end = moment();
  const start = end.subtract(30, `d`);
  const returningData = [...data];
  return returningData.filter((el) => el.watchedDate > start);
};

const getSortedGenres = (data) => {
  const genresSet = new Set();
  const allGenres = [];
  data.forEach((element) =>
    [...element.genres].forEach((el) => {
      allGenres.push(el);
      genresSet.add(el);
    })
  );

  const genresMap = [...genresSet].map((el) => {
    let countNum = 0;
    allGenres.forEach((el2) => (el2 === el ? countNum++ : ``));
    return {genre: el, count: countNum};
  });

  return genresMap.sort((a, b) => b.count - a.count);
};

const renderChart = (data) => {
  const genres = getSortedGenres(data);

  const ctx = document.querySelector(`.statistic__chart`).getContext(`2d`);
  const myChart = new Chart(ctx, {
    plugins: [chartjsPlugin],
    type: `horizontalBar`,
    data: {
      labels: genres.map((el) => el.genre),
      datasets: [
        {
          data: genres.map((el) => el.count),
          backgroundColor: `#ffe800`,
          strokeColor: `#ffe800`,
          borderWidth: 1,
          datalabels: {
            anchor: `start`,
            align: `start`,
            offset: 50,
            color: `#ffffff`,
            font: {
              size: 16
            },
            formatter: (value, context) =>
              `${context.chart.data.labels[context.dataIndex]}             ${value}`
          }
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      layout: {
        padding: {
          left: 200
        }
      },
      scales: {
        xAxes: [
          {
            display: false,
            ticks: {
              stepSize: 1,
              beginAtZero: true
            }
          }
        ],
        yAxes: [
          {
            display: false,
            barPercentage: 0.5,
            categoryPercentage: 1
          }
        ]
      }
    }
  });
  return myChart;
};

export default class Stat extends AbstractComponent {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;
    this._films = this._moviesModel.getAllMovies().filter((el) => el.onHistory);
    this._filteredData = this._films;
    this._currentFilter = `all-time`;
    this._onDataChange = this._onDataChange.bind(this);
    this._moviesModel.setDataChangeHandler(this._onDataChange);
    this._isHidden = true;

    this._filterChangeHandler = (evt) => {
      switch (evt.target.value) {
        case `week`:
          this._filteredData = getWeekData(this._films);
          this._currentFilter = `week`;
          this.rerender();
          break;
        case `today`:
          this._filteredData = getTodayData(this._films);
          this._currentFilter = `today`;
          this.rerender();
          break;
        case `year`:
          this._filteredData = getYearData(this._films);
          this._currentFilter = `year`;
          this.rerender();
          break;
        case `month`:
          this._filteredData = getMonthData(this._films);
          this._currentFilter = `month`;
          this.rerender();
          break;
        default:
          this._filteredData = this._films;
          this._currentFilter = `all-time`;
          this.rerender();
      }
    };
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this._element = null;

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);
    this.renderChart(this._filteredData);
  }

  getTemplate() {
    const sortedByGenres = getSortedGenres(this._filteredData);
    const topGenre = sortedByGenres[0] ? sortedByGenres[0].genre : `-`;
    const whatchedCount = this._filteredData.length;

    const totalDuration = moment.duration(this._filteredData.reduce((acc, el) => acc + (el.runtime * 60 * 1000), 0));

    return (`<section class="statistic ${this._isHidden ? `visually-hidden` : ``}">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${this._moviesModel.getRank()}</span>
        </p>
        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${this._currentFilter === `all-time` ? `checked` : ``}>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${this._currentFilter === `today` ? `checked` : ``}>
          <label for="statistic-today" class="statistic__filters-label">Today</label>
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${this._currentFilter === `week` ? `checked` : ``}>
          <label for="statistic-week" class="statistic__filters-label">Week</label>
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${this._currentFilter === `month` ? `checked` : ``}>
          <label for="statistic-month" class="statistic__filters-label">Month</label>
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${this._currentFilter === `year` ? `checked` : ``}>
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>
        <div class= "statistic__updated-wrapper">
        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${whatchedCount} <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${totalDuration.hours() +
              totalDuration.days() *
                24} <span class="statistic__item-description">h</span> ${totalDuration.minutes()} <span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${topGenre}</p>
          </li>
        </ul>
        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
        </div>
      </section>
      `);
  }

  setFilterListener() {
    const filters = this.getElement().querySelector(`.statistic__filters`);
    filters.addEventListener(`change`, this._filterChangeHandler);
  }

  renderChart() {
    renderChart(this._filteredData);
    this.setFilterListener();
  }

  _onDataChange() {
    this._films = this._moviesModel.getAllMovies().filter((el) => el.onHistory);
    this._filteredData = this._films;
    this._currentFilter = `all-time`;
    this.rerender();
  }

  show() {
    document.querySelector(`.statistic`).classList.remove(`visually-hidden`);
    this._isHidden = false;
  }

  hide() {
    document.querySelector(`.statistic`).classList.add(`visually-hidden`);
    this._isHidden = true;
  }
}
