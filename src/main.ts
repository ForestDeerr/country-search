import './style.css';

const main = document.querySelector<HTMLDivElement>('#app');

if (!main) {
    throw new Error('App element not found');
}

const container = document.createElement('div');
container.className = 'container';

const title = document.createElement('h1');
title.className = 'title';
title.textContent = 'Country Search';

const description = document.createElement('p');
description.className = 'description';
description.textContent = 'Find information about any country';

const searchContainer = document.createElement('div');
searchContainer.className = 'search-container';

const searchInput = document.createElement('input');
searchInput.className = 'search-input';
searchInput.type = 'search';
searchInput.placeholder = 'Enter country name...';
searchInput.autocomplete = 'off';

const results = document.createElement('section');
results.className = 'results';

searchContainer.append(searchInput);
container.append(title, description, searchContainer, results);
main.append(container);

document.body.replaceChildren(main);
