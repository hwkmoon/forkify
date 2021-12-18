import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';
import View from './view.js'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination'); 

    _generateMarkup() {
      const numPages = this._data.results.length / this._data.resultsPerPage;
      const previous_page = `
        <button data-goto=${this._data.page - 1} class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.page - 1}</span>
        </button>`;
      
      const next_page = `
        <button data-goto=${parseInt(this._data.page) + 1} class="btn--inline pagination__btn--next">
          <span>Page ${parseInt(this._data.page) + 1}</span>
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
      this._parentElement.addEventListener('click', function(e) {
        const button =  e.target.closest('.btn--inline');
        console.log(button);

        const goToPage = button.dataset.goto;
        console.log(goToPage);
        handler(goToPage)
      })
  }

}

export default new PaginationView();