import { describe, expect, it } from '@jest/globals';
import { timeoutError } from './timeoutError';

describe('timeoutError', () => {
    it('должна создавать ошибку превышения времени ожидания', () => {
        const error = timeoutError();

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('TimeoutError');
    });

    it('должна содержать сообщение о превышении времени ожидания', () => {
        const error = timeoutError();

        expect(error.message).toBe('Request timed out');
    });

    it('должна создавать новый экземпляр ошибки при каждом вызове', () => {
        const firstError = timeoutError();
        const secondError = timeoutError();

        expect(firstError).not.toBe(secondError);
    });
});
