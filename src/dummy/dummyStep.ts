import { randomIntBetween } from "../utils/randomIntBetween";
import { Game } from "../game/Game";

export async function dummyStep(game: Game) {
    const dx = randomIntBetween(-100, 100);
    const dy = randomIntBetween(-100, 100);

    game.changePlayerPosition(({ x, y }) => ({ x: x + dx, y: y + dy }));
}
