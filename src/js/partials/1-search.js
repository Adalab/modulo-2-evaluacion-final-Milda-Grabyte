function getSeriesData() {
  const inputValue = input.value;
  fetch('//api.tvmaze.com/search/shows?q=' + inputValue)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        resultsTitle.innerHTML = 'No se ha encontrado ninguna serie con este nombre';
      } else {
        resultsTitle.innerHTML = 'Resultados';
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
      renderSearchResults();
      addListenersToResultItems();
    });
}

// Visualises search results
function renderSearchResults() {
  let resultsContainer = selectElementByClass('.js-results__list');
  resultsContainer.innerHTML = '';
  for (let movie of searchResults) {
    const listItem = document.createElement('li');
    const image = document.createElement('img');
    const seriesTitle = document.createElement('h3');
    listItem.setAttribute('class', 'results__list--item js-results__list--item');
    listItem.setAttribute('id', movie.id);
    listItem.dataset.sourceObject = JSON.stringify(movie);
    resultsContainer.appendChild(listItem);
    image.setAttribute('class', 'results__list--item__img js-results__list--item__img');
    image.src = movie.imageSource;
    seriesTitle.setAttribute('class', 'results__list--item__title js-results__list--item__title');
    seriesTitle.innerHTML = movie.name;
    listItem.append(image, seriesTitle); // More than one DOM node

    // Check if a series is included in favorites and if so, appear with favorites styles upon being delivered as a result
    for (let favoriteItem of favoriteSeries) {
      if (movie.id === favoriteItem.id) {
        listItem.classList.add('favorite');
        break; // As soon as the item is detected, the function stops iterating
      }
    }
    resultsContainer.appendChild(listItem);
  }
}

// Pick one item from the visualised search results
function addListenersToResultItems() {
  const series = document.querySelectorAll('.js-results__list--item');
  for (const item of series) {
    item.addEventListener("click", onFavoriteItemClick);
  }
}
