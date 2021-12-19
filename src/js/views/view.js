import icons from 'url:../../img/icons.svg';

export default class View {

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        //console.log(markup);
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }

      update(data) {

        this._data = data;
        const newMarkup = this._generateMarkup();
        
        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        //console.log(newElements);
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));
        //console.log(curElements);

        newElements.forEach((newEl, i) => {
          const curEl = curElements[i];
          //Updates change text
          if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
            curEl.textContent = newEl.textContent;
          }
          //Updates change attributes
          if (!newEl.isEqualNode(curEl)) {
            Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
          }
        });
      }
    
      _clear() {
        this._parentElement.innerHTML = '';
      }
    
      renderSpinner() {
        const markup = `
          <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }
    
      renderError(message = this._errorMessage) {
        const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `;
          this._clear();
          this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }
    
      addHandlerRender(handler) {
        const events = ['hashchange', 'load'];
        events.forEach(ev => window.addEventListener(ev, handler));
      }
}