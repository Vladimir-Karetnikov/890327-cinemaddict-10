import {movies} from '../mock/data.js';

const getFooterTemplate = () => {
  return `
    <section class="footer__logo logo logo--smaller">
      Cinemaddict
    </section>
    <section class="footer__statistics">
      <p>${movies.length} movies inside</p>
    </section>`;
};

export {getFooterTemplate};
