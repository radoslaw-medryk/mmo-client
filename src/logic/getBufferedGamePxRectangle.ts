import { GamePxPosition } from "../models/GamePxPosition";
import { GamePxRectangle } from "../models/GamePxRectangle";

export function getBufferedGamePxRectangle(baseRectangle: GamePxRectangle, chunkBufferPxSize: number): GamePxRectangle {
    const topLeft: GamePxPosition = {
        gamePxX: baseRectangle.topLeft.gamePxX - chunkBufferPxSize,
        gamePxY: baseRectangle.topLeft.gamePxY - chunkBufferPxSize,
    };

    const bottomRight: GamePxPosition = {
        gamePxX: baseRectangle.bottomRight.gamePxX + chunkBufferPxSize,
        gamePxY: baseRectangle.bottomRight.gamePxY + chunkBufferPxSize,
    };

    return {
        topLeft,
        bottomRight,
    };
}
