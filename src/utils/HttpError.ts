export function HttpError(status: number) {
    const error = new Error(`HTTP error: ${status}`);

    error.name = 'HttpError';

    return Object.assign(error, { status });
}
