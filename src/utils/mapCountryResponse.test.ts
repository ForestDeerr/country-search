import { describe, expect, it } from '@jest/globals';
import { mapCountryResponse } from './mapCountryResponse';

describe('mapCountryResponse', () => {
    it('должна преобразовывать данные страны из API', () => {
        const raw = {
            name: 'Belarus',
            flags: {
                png: 'https://flagcdn.com/w320/by.png',
                svg: 'https://flagcdn.com/by.svg',
            },
            capital: 'Minsk',
            region: 'Europe',
            population: 9398861,
            languages: [
                { name: 'Belarusian', iso639_1: 'be', iso639_2: 'bel', nativeName: 'беларуская мова' },
                { name: 'Russian', iso639_1: 'ru', iso639_2: 'rus', nativeName: 'Русский' },
            ],
        };

        const result = mapCountryResponse(raw);

        expect(result).toEqual({
            name: 'Belarus',
            flag: 'https://flagcdn.com/by.svg',
            capital: 'Minsk',
            region: 'Europe',
            population: 9398861,
            languages: ['Belarusian', 'Russian'],
        });
    });

    it('не должна изменять исходные данные', () => {
        const raw = {
            name: 'Belarus',
            flags: {
                png: 'https://flagcdn.com/w320/by.png',
                svg: 'https://flagcdn.com/by.svg',
            },
            capital: 'Minsk',
            region: 'Europe',
            population: 9398861,
            languages: [
                { name: 'Belarusian', iso639_1: 'be', iso639_2: 'bel', nativeName: 'беларуская мова' },
                { name: 'Russian', iso639_1: 'ru', iso639_2: 'rus', nativeName: 'Русский' },
            ],
        };

        const original = structuredClone(raw);

        mapCountryResponse(raw);

        expect(raw).toEqual(original);
    });
});
