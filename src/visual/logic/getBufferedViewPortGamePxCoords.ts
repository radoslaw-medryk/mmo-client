import { GamePxPosition } from "../../models/GamePxPosition";
import { GamePxRectangle } from "../../models/GamePxRectangle";
import { VisualConsts } from "../VisualConsts";

export function getBufferedViewPortGamePxCoords(
    visualConsts: VisualConsts,
    viewPort: GamePxRectangle
): GamePxRectangle {
    const { bufferSizePx } = visualConsts;

    const topLeft: GamePxPosition = {
        gamePxX: viewPort.topLeft.gamePxX - bufferSizePx,
        gamePxY: viewPort.topLeft.gamePxY - bufferSizePx,
    };

    const bottomRight: GamePxPosition = {
        gamePxX: viewPort.bottomRight.gamePxX + bufferSizePx,
        gamePxY: viewPort.bottomRight.gamePxY + bufferSizePx,
    };

    return {
        topLeft,
        bottomRight,
    };
}
