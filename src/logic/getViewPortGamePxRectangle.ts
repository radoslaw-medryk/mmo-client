import { GamePxPosition } from "../models/GamePxPosition";
import { GamePxRectangle } from "../models/GamePxRectangle";
import { VisualConsts } from "../models/VisualConsts";

export function getViewPortGamePxRectangle(visualConsts: VisualConsts, center: GamePxPosition): GamePxRectangle {
    const { viewPortSize } = visualConsts;

    const topLeft: GamePxPosition = {
        gamePxX: Math.floor(center.gamePxX - viewPortSize.pxWidth / 2),
        gamePxY: Math.floor(center.gamePxY - viewPortSize.pxHeight / 2),
    };

    const bottomRight: GamePxPosition = {
        gamePxX: topLeft.gamePxX + viewPortSize.pxWidth,
        gamePxY: topLeft.gamePxY + viewPortSize.pxHeight,
    };

    return {
        topLeft,
        bottomRight,
    };
}
