
// Class selector
function selectClass(className) {
  return document.querySelector(className);
}

// Console log function
function feedback(element) {
  return console.log(element);
}

function visualiseFavorites() {
  const favoritesList = selectClass('.js-favorites__list');
  const favorites = selectClass('.js-favorites');
  favoritesList.innerHTML = '';
  if (favoriteSeries.length === 0) {
    favorites.classList.add('hidden');
  } else {
    for (let favoriteItem of favoriteSeries) {
      favorites.classList.remove('hidden');
      generateFavoritesDOM(favoritesList, favoriteSeries, favoriteItem);
    }
  }
}
const favoriteSeries = loadFavorites();
console.log(favoriteSeries);
visualiseFavorites();

const button = selectClass('.js-button');
const input = selectClass('.js-search-field');
const resultsTitle = selectClass('.js-results__title');

let searchResults;

function getSeriesData() {
  const inputValue = input.value;
  fetch('//api.tvmaze.com/search/shows?q=' + inputValue)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        resultsTitle.innerHTML = 'No se ha encontrado ninguna serie con este nombre';
      } else {
        searchResults = [];
        for (let i = 0; i < data.length; i++) {
          let series = {};
          series.name = data[i].show.name;
          series.id = data[i].show.id;
          if (data[i].show.image === null) {
            series.imageSource = 'https://via.placeholder.com/210x295/ffffff/666666/?%20text=TV';
          } else if (data[i].show.image.medium === null) {
            series.imageSource = data[i].show.image.original;
          } else {
            series.imageSource = data[i].show.image.medium;
          }
          searchResults.push(series);
        }
      }
      feedback(searchResults);
      visualise();
      listenToSeries();
    });
}
