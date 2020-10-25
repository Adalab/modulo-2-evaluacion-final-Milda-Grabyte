let favoriteSeries = [];

// Generate favorite series list
function addToFavorites(event) {
  const favorites = selectClass('.js-favorites');
  favorites.classList.remove('hidden');
  const clickedSeries = event.currentTarget;
  const clickedSeriesId = parseInt(clickedSeries.id);
  const isFavorite = favoriteSeries.findIndex((item) => {
    return item.id === clickedSeriesId;
  });
  // Check if a series is in the favorites list
  if (isFavorite === -1) {
    const parsedSourceObject = JSON.parse(clickedSeries.dataset.sourceObject);
    clickedSeries.classList.add('favorite');
    favoriteSeries.push(parsedSourceObject); //me lo metía con comillas (string);
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'js-favorites__list--item')
    const image = document.createElement('img');
    image.setAttribute('class', 'js-favorites__list--item__img');
    image.src = parsedSourceObject.imageSource;
    const seriesTitle = document.createElement('h4');
    seriesTitle.setAttribute('class', 'js-favorites__list--item__title');
    seriesTitle.innerHTML = parsedSourceObject.name;
    listItem.append(image, seriesTitle);
    const favoritesList = selectClass('.js-favorites__list');
    favoritesList.appendChild(listItem);
  }
}

feedback(favoriteSeries);

// Pick one item from the visualised search results
function listenToSeries() {
  const series = document.querySelectorAll('.js-results__list--item');
  for (const item of series) {
    item.addEventListener("click", addToFavorites);
  }
}

function onClick() {
  getSeriesData();
}

// Click event
button.addEventListener('click', onClick);