import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { searchCountries } from './searchCountries';

describe('searchCountries', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('должна отправлять запрос с поисковой строкой', async () => {
        const fetchMock = jest.spyOn(globalThis, 'fetch').mockResolvedValue(
            new Response(JSON.stringify([]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            })
        );

        await searchCountries('belarus');

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('belarus'), expect.any(Object));
    });

    it('должна передавать AbortSignal в fetch', async () => {
        const fetchMock = jest.spyOn(globalThis, 'fetch').mockResolvedValue(
            new Response(JSON.stringify([]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            })
        );

        const controller = new AbortController();

        await searchCountries('belarus', controller.signal);

        expect(fetchMock).toHaveBeenCalledWith(expect.any(String), {
            signal: controller.signal,
        });
    });

    it('должна возвращать массив стран', async () => {
        const countries = [{ name: 'Belarus' }];

        jest.spyOn(globalThis, 'fetch').mockResolvedValue(
            new Response(JSON.stringify(countries), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            })
        );

        const result = await searchCountries('belarus');

        expect(result).toEqual(countries);
    });

    it('должна возвращать пустой массив при статусе 404', async () => {
        jest.spyOn(globalThis, 'fetch').mockResolvedValue(
            new Response(null, {
                status: 404,
            })
        );

        const result = await searchCountries('unknown-country');

        expect(result).toEqual([]);
    });

    it('должна кодировать поисковую строку в URL', async () => {
        const fetchMock = jest.spyOn(globalThis, 'fetch').mockResolvedValue(
            new Response(JSON.stringify([]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            })
        );

        await searchCountries('south korea');

        expect(fetchMock).toHaveBeenCalledWith('https://countries.dev/name/south%20korea', expect.any(Object));
    });

    it('должна выбрасывать HttpError при статусе 500', async () => {
        jest.spyOn(globalThis, 'fetch').mockResolvedValue(
            new Response(null, {
                status: 500,
            })
        );

        await expect(searchCountries('belarus')).rejects.toMatchObject({
            name: 'HttpError',
            status: 500,
        });
    });

    it('должна сохранять статус ответа в HttpError', async () => {
        jest.spyOn(globalThis, 'fetch').mockResolvedValue(
            new Response(null, {
                status: 503,
            })
        );

        await expect(searchCountries('belarus')).rejects.toMatchObject({
            name: 'HttpError',
            status: 503,
        });
    });

    it('должна передавать ошибку отмены запроса', async () => {
        const abortError = new Error('The operation was aborted');
        abortError.name = 'AbortError';

        jest.spyOn(globalThis, 'fetch').mockRejectedValue(abortError);

        await expect(searchCountries('belarus')).rejects.toMatchObject({
            name: 'AbortError',
        });
    });

    it('должна передавать ошибку превышения времени ожидания', async () => {
        const timeoutError = new Error('Request timed out');
        timeoutError.name = 'TimeoutError';

        jest.spyOn(globalThis, 'fetch').mockRejectedValue(timeoutError);

        await expect(searchCountries('belarus')).rejects.toMatchObject({
            name: 'TimeoutError',
        });
    });
});
