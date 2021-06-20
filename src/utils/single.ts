export function single<T>(arr: T[]): T | undefined {
    if (arr.length > 1) {
        throw new Error(`arr.length > 1`);
    }

    return arr[0];
}
