// Class selector
function selectClass(className) {
  return document.querySelector(className);
}

// Console log function
function feedback(element) {
  return console.log(element);
}

function visualiseFavorites() {
  for (let favoriteItem of favoriteSeries) {
    const favorites = selectClass('.js-favorites');
    favorites.classList.remove('hidden');
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'js-favorites__list--item');
    const image = document.createElement('img');
    image.setAttribute('class', 'js-favorites__list--item__img');
    image.src = favoriteItem.imageSource;
    const seriesTitle = document.createElement('h4');
    seriesTitle.setAttribute('class', 'js-favorites__list--item__title');
    seriesTitle.innerHTML = favoriteItem.name;
    listItem.append(image, seriesTitle);
    const favoritesList = selectClass('.js-favorites__list');
    favoritesList.appendChild(listItem);
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
