interface Options {
  signal?: AbortSignal;
}

export function wait(ms: number, options?: Options): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      if (options?.signal?.aborted) return reject(new TimersError("Aborted"));
      return resolve();
    }, ms);
    if (options?.signal) {
      options.signal.addEventListener("abort", () => {
        clearTimeout(timeout);
        reject(new TimersError("Aborted"));
      });
    }
  });
}

export async function* interval(ms: number, options?: Options) {
  const signal = options?.signal ?? new AbortSignal();
  while (!signal.aborted) {
    try {
      yield await wait(ms, { signal });
    } catch {
      return;
    }
  }
}

export class TimersError extends globalThis.Error {}
