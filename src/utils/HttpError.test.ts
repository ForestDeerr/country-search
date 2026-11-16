import { describe, expect, it } from '@jest/globals';
import { HttpError } from './HttpError';

describe('HttpError', () => {
    it('должна создавать ошибку со статусом HTTP', () => {
        const error = HttpError(500);

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('HttpError');
        expect(error.message).toBe('HTTP error: 500');
        expect(error.status).toBe(500);
    });

    it('должна сохранять переданный HTTP-статус', () => {
        const error = HttpError(404);

        expect(error.status).toBe(404);
    });

    it('должна формировать сообщение с переданным HTTP-статусом', () => {
        const error = HttpError(503);

        expect(error.message).toBe('HTTP error: 503');
    });
});
