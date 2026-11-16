import { Country } from './utils/mapCountryResponse';

export function createCountryCard(country: Country): HTMLElement {
    const card = document.createElement('article');
    card.className = 'country-card';

    const flagContainer = document.createElement('div');
    flagContainer.className = 'country-flag-container';

    const flag = document.createElement('img');
    flag.className = 'country-flag';
    flag.src = country.flag;
    flag.alt = `${country.name} flag`;

    const info = document.createElement('div');
    info.className = 'country-info';

    const name = document.createElement('h2');
    name.className = 'country-name';
    name.textContent = country.name;

    const capital = document.createElement('p');
    capital.textContent = `Capital: ${country.capital}`;

    const region = document.createElement('p');
    region.textContent = `Region: ${country.region}`;

    const population = document.createElement('p');
    population.textContent = `Population: ${country.population.toLocaleString()}`;

    const languages = document.createElement('p');
    languages.textContent = `Languages: ${country.languages.join(', ')}`;

    flagContainer.append(flag);
    info.append(name, capital, region, population, languages);
    card.append(flagContainer, info);

    return card;
}
