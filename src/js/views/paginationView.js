import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';
import View from './view.js'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination'); 

    _generateMarkup() {
      const numPages = this._data.results.length / this._data.resultsPerPage;
      const previous_page = `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.page - 1}</span>
        </button>`;
      const next_page = `
        <button class="btn--inline pagination__btn--next">
          <span>Page ${this._data.page + 1}</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </button>
      `;
      let markup = this._data.page != 1 ? previous_page : '';
      markup += this._data.page < numPages ? next_page : '';
      return markup;
    }

    addHandlerRender(handler) {
      const buttons = this._parentElement.querySelectorAll('.btn--inline pagination');
      console.log(buttons);
      buttons.map(button => {
        if (button.isSameNode(this._parentElement.querySelector('.btn--inline pagination__btn--prev')))
          button.addEventListener('click', handler(-1))
        if (button.isSameNode(this._parentElement.querySelector('.btn--inline pagination__btn--next')))
        button.addEventListener('click', handler(1))
      }
      );
  }

}

export default new PaginationView();