import { randomNumber } from "./randomNumber";

export function randomColor() {
    const r = randomNumber(0, 256);
    const g = randomNumber(0, 256);
    const b = randomNumber(0, 256);

    const rx = r.toString(16).padStart(2, "0");
    const gx = g.toString(16).padStart(2, "0");
    const bx = b.toString(16).padStart(2, "0");

    return `#${rx}${gx}${bx}`;
}
