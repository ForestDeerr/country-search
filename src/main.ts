import './style.css';

const main = document.querySelector<HTMLDivElement>('#app');

if (!main) {
    throw new Error('App element not found');
}

const title = document.createElement('p');

title.textContent = 'country-search';

main.append(title);
