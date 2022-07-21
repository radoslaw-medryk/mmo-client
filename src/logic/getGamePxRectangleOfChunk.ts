import { ChunkPosition } from "../models/ChunkPosition";
import { GamePxPosition } from "../models/GamePxPosition";
import { GamePxRectangle } from "../models/GamePxRectangle";
import { VisualConsts } from "../models/VisualConsts";

export function getGamePxRectangleOfChunk(visualConsts: VisualConsts, chunkPosition: ChunkPosition): GamePxRectangle {
    const { chunkSize } = visualConsts;
    const { chunksX, chunksY } = chunkPosition;

    const gamePxX = chunksX * chunkSize.pxWidth;
    const gamePxY = chunksY * chunkSize.pxHeight;
    const topLeft: GamePxPosition = {
        gamePxX,
        gamePxY,
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
