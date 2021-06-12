import { ValueOrChangeFunction } from "../game/models/ValueOrChangeFunction";

export function getChangeValue<T>(prev: T, change: ValueOrChangeFunction<T>): T {
    if (typeof change === "function") {
        return (change as Function)(prev);
    }

    return change;
}
