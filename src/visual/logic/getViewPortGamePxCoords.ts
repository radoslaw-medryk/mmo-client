import { GamePxPosition } from "../../models/GamePxPosition";
import { GamePxRectangle } from "../../models/GamePxRectangle";
import { LayerState } from "../layer/LayerState";
import { VisualConsts } from "../VisualConsts";

export function getViewPortGamePxCoords(visualConsts: VisualConsts, layerState: LayerState): GamePxRectangle {
    const { center } = layerState;
    const { viewPortSize, tileSize } = visualConsts;

    const viewPortGamePxWidth = viewPortSize.tilesWidth * tileSize.pxWidth;
    const viewPortGamePxHeight = viewPortSize.tilesHeight * tileSize.pxHeight;

    const topLeft: GamePxPosition = {
        gamePxX: Math.floor(center.gamePxX - viewPortGamePxWidth / 2),
        gamePxY: Math.floor(center.gamePxY - viewPortGamePxHeight / 2),
    };

    const bottomRight: GamePxPosition = {
        gamePxX: topLeft.gamePxX + viewPortGamePxWidth,
        gamePxY: topLeft.gamePxY + viewPortGamePxHeight,
    };

    return {
        topLeft,
        bottomRight,
    };
}
