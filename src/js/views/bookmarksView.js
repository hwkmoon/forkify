import icons from 'url:../../img/icons.svg';
import View from './view.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks');

  _generateMarkup() {
    console.log(this._data);
    if (!this._data) {
      const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="src/img/icons.svg#icon-smile"></use>
            </svg>
          </div>
          <p>
            No bookmarks yet. Find a nice recipe and bookmark it :)
          </p>
        </div>
      `;
      return markup;
    }
    else {
      const markup = this._data.map(recipe => {
        return `
          <li class="preview">
            <a class="preview__link" href="#${recipe.id}">
              <figure class="preview__fig">
                <img src="${recipe.image} alt="${recipe.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__name">
                  ${recipe.title}
                </h4>
                <p class="preview__publisher">${recipe.publisher}</p>
              </div>
            </a>
          </li>
        `;
      }).join('');
      return markup;
    }
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  // addHandlerBookmarks(handler) {
  //   this._parentElement.addEventListener('mousemove', handler);
  // }
}
export default new BookmarksView();