export function abortError() {
    const error = new Error('Request was aborted');
    error.name = 'AbortError';

    return error;
}
