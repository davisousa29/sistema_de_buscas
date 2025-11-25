export function measureTime(fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    return { time: end - start, result };
}
