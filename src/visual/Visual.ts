import { Game } from "../game/Game";
import { Position } from "../game/models/Position";

export class Visual {
    private game: Game;

    constructor(game: Game) {
        this.game = game;

        this.subscribeToGame();
    }

    private subscribeToGame() {
        this.game.onPlayerPositionChanged.on(this.onPlayerPositionChanged);
    }

    private onPlayerPositionChanged({ x, y }: Position) {
        console.log(`>>> NEW POS: x = ${x}, y = ${y}.`);
    }
}
