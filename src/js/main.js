'use strict';

let searchResults;
let favoriteSeries = loadFavorites();
renderFavoritesList();

const button = selectElementByClass('.js-button');
const resetButton = selectElementByClass('.js-favorites__list--item__btn--reset');
const input = selectElementByClass('.js-search-field');
const resultsTitle = selectElementByClass('.js-results__title');

// Events
resetButton.addEventListener('click', resetFavorites);
button.addEventListener('click', getSeriesData);

// Enter key triggers click event
input.addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    event.preventDefault();
    event.stopPropagation();
    button.click();
  }
});