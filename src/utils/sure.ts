export function sure<T>(value: T | null | undefined): T {
    if (value === null || value === undefined) {
        throw new Error("value === null || value === undefined");
    }

    return value;
}
