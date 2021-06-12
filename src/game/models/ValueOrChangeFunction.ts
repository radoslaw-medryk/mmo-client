export type ValueOrChangeFunction<T> = T | ((prev: T) => T);
