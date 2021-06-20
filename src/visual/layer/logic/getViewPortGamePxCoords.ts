import { GamePxPosition } from "../../../models/GamePxPosition";
import { VisualConsts } from "../../VisualConsts";
import { LayerState } from "../LayerState";

export type ViewPortGamePxCoords = {
    topLeft: GamePxPosition;
    bottomRight: GamePxPosition;
};

export function getViewPortGamePxCoords(visualConsts: VisualConsts, layerState: LayerState): ViewPortGamePxCoords {
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
