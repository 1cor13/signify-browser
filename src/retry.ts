export interface RetryOptions {
    maxSleep?: number;
    minSleep?: number;
    maxRetries?: number;
    timeout?: number;
    signal?: AbortSignal;
}

function delay(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            signal?.removeEventListener('abort', onAbort);
            resolve();
        }, ms);

        const onAbort = () => {
            clearTimeout(timer);
            reject(new DOMException('Aborted', 'AbortError'));
        };

        if (signal?.aborted) {
            clearTimeout(timer);
            reject(new DOMException('Aborted', 'AbortError'));
        } else if (signal) {
            signal.addEventListener('abort', onAbort);
        }
    });
}

export async function retry<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    const {
        maxSleep = 1000,
        minSleep = 10,
        maxRetries,
        timeout = 10000,
        signal,
    } = options;

    const increaseFactor = 50;

    let retries = 0;
    let cause: Error | null = null;
    const start = Date.now();

    while (
        (signal === undefined || !signal.aborted) &&
        Date.now() - start < timeout &&
        (maxRetries === undefined || retries < maxRetries)
    ) {
        try {
            const result = await fn();
            return result;
        } catch (err) {
            cause = err as Error;
            const sleep = Math.max(
                minSleep,
                Math.min(maxSleep, 2 ** retries * increaseFactor)
            );
            retries++;
            await delay(sleep, signal);
        }
    }

    if (!cause) {
        cause = new Error(`Failed after ${retries} attempts`);
    }

    Object.assign(cause, { retries, maxAttempts: maxRetries });
    throw cause;
}
