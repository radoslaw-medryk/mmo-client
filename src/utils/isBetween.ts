export function isBetween(lowIncl: number, value: number, highIncl: number) {
    return lowIncl <= value && highIncl >= value;
}
