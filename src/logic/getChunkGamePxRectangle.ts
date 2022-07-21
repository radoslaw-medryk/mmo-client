import { ChunkPosition } from "../models/ChunkPosition";
import { GamePxPosition } from "../models/GamePxPosition";
import { GamePxRectangle } from "../models/GamePxRectangle";
import { VisualConsts } from "../models/VisualConsts";

export function getChunkGamePxRectangle(
    { chunkSize }: VisualConsts,
    { chunksX, chunksY }: ChunkPosition
): GamePxRectangle {
    const topLeft: GamePxPosition = {
        gamePxX: chunkSize.pxWidth * chunksX,
        gamePxY: chunkSize.pxHeight * chunksY,
    };

    const bottomRight: GamePxPosition = {
        gamePxX: topLeft.gamePxX + chunkSize.pxWidth,
        gamePxY: topLeft.gamePxY + chunkSize.pxHeight,
    };

    return {
        topLeft,
        bottomRight,
    };
}
