export function timeoutError() {
    const error = new Error('Request timed out');
    error.name = 'TimeoutError';

    return error;
}
