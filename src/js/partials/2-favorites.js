// Create DOM for favorite series results
function renderFavoritesList() {
  const favoritesList = selectElementByClass('.js-favorites__list');
  const favorites = selectElementByClass('.js-favorites');
  favoritesList.innerHTML = '';
  if (favoriteSeries.length === 0) {
    favorites.classList.add('hidden');
  } else {
    for (let favoriteItem of favoriteSeries) {
      favorites.classList.remove('hidden');
      createFavoriteElement(favoritesList, favoriteSeries, favoriteItem);
    }
  }
}

function onFavoriteItemClick(event) {
  const favorites = selectElementByClass('.js-favorites');
  const favoritesList = selectElementByClass('.js-favorites__list');
  favorites.classList.remove('hidden');
  const clickedSeries = event.currentTarget;
  const clickedSeriesId = parseInt(clickedSeries.id);

  const isFavorite = favoriteSeries.findIndex((item) => {
    return item.id === clickedSeriesId;
  });

  clickedSeries.classList.toggle('favorite');
  // Check if a series is in the favorites list
  if (isFavorite === -1) {
    const parsedSourceObject = JSON.parse(clickedSeries.dataset.sourceObject);
    favoriteSeries.push(parsedSourceObject); //me lo metía con comillas (string);
    createFavoriteElement(favoritesList, favoriteSeries, parsedSourceObject);
    saveFavorites(favoriteSeries);
  } else {
    // El segundo click elimina de favoritos
    let item;
    for (let favorite of favoriteSeries) {
      if (favorite.id === clickedSeriesId) {
        item = favorite;
        break;
      }
    }
    removeFavorite(favoriteSeries, item);
  }
}

function createFavoriteElement(list, favoriteSeries, item) {
  const listItem = document.createElement('li');
  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.setAttribute('class', 'favorites__list--item__btn js-favorites__list--item__btn');
  const cancelImage = document.createElement('img');
  cancelImage.src = './assets/images/close-button.png';
  cancelImage.setAttribute('class', 'favorites__list--item__btn-img js-favorites__list--item__btn-img');
  cancelButton.appendChild(cancelImage);
  listItem.appendChild(cancelButton);
  listItem.setAttribute('class', 'favorites__list--item js-favorites__list--item');
  const image = document.createElement('img');
  image.setAttribute('class', 'favorites__list--item__img js-favorites__list--item__img');
  image.src = item.imageSource;
  const seriesTitle = document.createElement('h4');
  seriesTitle.setAttribute('class', 'favorites__list--item__title js-favorites__list--item__title');
  seriesTitle.innerHTML = item.name;
  listItem.append(image, seriesTitle);
  list.appendChild(listItem);

  cancelButton.addEventListener('click', (event) => {
    removeFavorite(favoriteSeries, item);
  });
}

function loadFavorites() {
  const favoritesLoaded = JSON.parse(localStorage.getItem('Favorite series'));
  let favoriteSeries;
  if (favoritesLoaded === null) {
    favoriteSeries = [];
  } else {
    favoriteSeries = favoritesLoaded;
  }
  return favoriteSeries;
}

function saveFavorites(favoriteSeries) {
  localStorage.setItem('Favorite series', JSON.stringify(favoriteSeries));
}

function removeFavorite(favoriteSeries, item) {
  const itemPosition = favoriteSeries.indexOf(item);
  favoriteSeries.splice(itemPosition, 1);
  saveFavorites(favoriteSeries);
  renderFavoritesList();

  // If an item is removed from favorites list, favorite styles are removed from the item in the results
  const resultsItems = document.querySelectorAll('.results__list--item');
  for (let resultsItem of resultsItems) {
    if (parseInt(resultsItem.id) === item.id) {
      resultsItem.classList.remove('favorite');
      break;
    }
  }
}

function resetFavorites() {
  localStorage.removeItem('Favorite series');
  favoriteSeries = loadFavorites();
  renderFavoritesList();

  // Remove favorite styles from results list upon reset
  const resultsItems = document.querySelectorAll('.results__list--item');
  for (let resultsItem of resultsItems) {
    resultsItem.classList.remove('favorite');
  }
}
