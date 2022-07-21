import { GamePxPosition } from "../models/GamePxPosition";
import { GamePxRectangle } from "../models/GamePxRectangle";
import { VisualConsts } from "../models/VisualConsts";

export function getBufferedGamePxRectangle(
    visualConsts: VisualConsts,
    baseRectangle: GamePxRectangle
): GamePxRectangle {
    const { bufferPxSize } = visualConsts;

    const topLeft: GamePxPosition = {
        gamePxX: baseRectangle.topLeft.gamePxX - bufferPxSize,
        gamePxY: baseRectangle.topLeft.gamePxY - bufferPxSize,
    };

    const bottomRight: GamePxPosition = {
        gamePxX: baseRectangle.bottomRight.gamePxX + bufferPxSize,
        gamePxY: baseRectangle.bottomRight.gamePxY + bufferPxSize,
    };

    return {
        topLeft,
        bottomRight,
    };
}
