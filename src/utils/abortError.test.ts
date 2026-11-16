import { describe, expect, it } from '@jest/globals';
import { abortError } from './abortError';

describe('abortError', () => {
    it('должна создавать ошибку отмены запроса', () => {
        const error = abortError();

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('AbortError');
    });

    it('должна содержать сообщение об отмене запроса', () => {
        const error = abortError();

        expect(error.message).toBe('Request was aborted');
    });

    it('должна создавать новый экземпляр ошибки при каждом вызове', () => {
        const firstError = abortError();
        const secondError = abortError();

        expect(firstError).not.toBe(secondError);
    });
});
