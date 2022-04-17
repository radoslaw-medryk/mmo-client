import { ChunkPosition } from "../../models/ChunkPosition";
import { GamePxPosition } from "../../models/GamePxPosition";
import { GamePxRectangle } from "../../models/GamePxRectangle";
import { VisualConsts } from "../VisualConsts";

export function getChunkGamePxRectangle(
    { chunkSize, tileSize }: VisualConsts,
    { chunksX, chunksY }: ChunkPosition
): GamePxRectangle {
    const chunkPxWidth = chunkSize.tilesWidth * tileSize.pxWidth;
    const chunkPxHeight = chunkSize.tilesHeight * tileSize.pxHeight;

    const topLeft: GamePxPosition = {
        gamePxX: chunkPxWidth * chunksX,
        gamePxY: chunkPxHeight * chunksY,
    };

    const bottomRight: GamePxPosition = {
        gamePxX: topLeft.gamePxX + chunkPxWidth,
        gamePxY: topLeft.gamePxY + chunkPxHeight,
    };

    return {
        topLeft,
        bottomRight,
    };
}
