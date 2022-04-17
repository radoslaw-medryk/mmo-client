import { ChunkPosition } from "../../models/ChunkPosition";
import { GamePxPosition } from "../../models/GamePxPosition";
import { GamePxRectangle } from "../../models/GamePxRectangle";
import { VisualConsts } from "../VisualConsts";

export function getGamePxRectangleOfChunk(visualConsts: VisualConsts, chunkPosition: ChunkPosition): GamePxRectangle {
    const { chunkSize, tileSize } = visualConsts;
    const { chunksX, chunksY } = chunkPosition;

    const chunkPxWidth = chunkSize.tilesWidth * tileSize.pxWidth;
    const chunkPxHeight = chunkSize.tilesHeight * tileSize.pxHeight;

    const gamePxX = chunksX * chunkPxWidth;
    const gamePxY = chunksY * chunkPxHeight;
    const topLeft: GamePxPosition = {
        gamePxX,
        gamePxY,
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
