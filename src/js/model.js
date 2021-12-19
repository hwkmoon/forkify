import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1
  },
  bookmarks: []
};

export const loadRecipe = async function(id) {
    try {
      const data = await getJSON(`${API_URL}/${id}`);
  
      const {recipe} = data.data;
      state.recipe = {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceUrl: recipe.source_url,
          image: recipe.image_url,
          serving: recipe.servings,
          coookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients
      };
    } catch(err) {
        console.error(`${err}`);
        throw err;
    }
}

export const loadSearchResults = async function(query) {
    try {
      state.search.query = query;
      const data = await getJSON(`${API_URL}?search=${query}`);
      console.log(data);

      state.search.results = data.data.recipes.map(rec => {
        return {
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
        }
      });
      console.log(state.search.results);
    } catch {
        console.log(err);
        throw(err);
    }
}

export const getSearchResultsPage = function(page = state.search.page) {

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end)
}

export const updateServings = function(newServings) {
  const factor = newServings / state.recipe.serving;
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * factor ;
  });
  state.recipe.serving = newServings;
}

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe) {

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  // Add bookmark
  state.bookmarks.push(recipe);

  // Store in local storage
  persistBookmarks();
}

export const deleteBookmark = function(id) {
  //console.log('heyyyy');
  console.log(state.bookmarks);
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

    // Mark current recipe as not bookmark
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
    // Store in local storage
  persistBookmarks();
}

const init = function() {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
}

init();