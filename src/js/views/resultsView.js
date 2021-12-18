import View from './view.js'

class ResultsView extends View  {
    _parentElement = document.querySelector('.search-results');
    _errorMessage = 'No recipes found for your query, pleasy try again';
    
    _generateMarkup() {
      const previews = this._data.map(recipe => {
        return `
        <li class="preview">
          <a class="preview__link preview__link" href="#${recipe.id}">
            <figure class="preview__fig">
              <img src="${recipe.image}" alt="Test" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${recipe.title}</h4>
              <p class="preview__publisher">${recipe.publisher}</p>
              <div class="preview__user-generated">
                <svg>
                  <use href="#23456"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>
    `;
      }).join('');
      return previews;
    }
}

export default new ResultsView();