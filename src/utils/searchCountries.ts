import { HttpError } from './HttpError';

const API_URL = 'https://countries.dev/name/';

export async function searchCountries(query: string, signal?: AbortSignal) {
    const url = `${API_URL}${encodeURIComponent(query)}`;

    const response = await fetch(url, signal ? { signal } : {});

    if (response.status === 404) {
        return [];
    }

    if (!response.ok) {
        throw HttpError(response.status);
    }

    const countries = await response.json();

    return countries;
}
