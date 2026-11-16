import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { debounce } from './debounce';

describe('debounce', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    it('должен возвращать функцию', () => {
        const debounced = debounce(jest.fn(), 300);

        expect(typeof debounced).toBe('function');
    });

    it('не должен вызывать функцию сразу', () => {
        jest.useFakeTimers();

        const mockFn = jest.fn();
        const debounced = debounce(mockFn, 300);

        debounced();

        expect(mockFn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(299);

        expect(mockFn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1);

        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('должен сбрасывать таймер при повторном вызове', () => {
        jest.useFakeTimers();

        const mockFn = jest.fn();
        const debounced = debounce(mockFn, 300);

        debounced();

        jest.advanceTimersByTime(200);

        debounced();

        jest.advanceTimersByTime(299);

        expect(mockFn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1);

        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
