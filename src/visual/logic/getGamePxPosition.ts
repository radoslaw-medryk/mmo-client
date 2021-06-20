import { ChunkPosition } from "../../models/ChunkPosition";
import { GamePxPosition } from "../../models/GamePxPosition";
import { VisualConsts } from "../VisualConsts";

export function getGamePxPosition(visualConsts: VisualConsts, chunkPosition: ChunkPosition): GamePxPosition {
    const { chunkSize, tileSize } = visualConsts;
    const { chunksX, chunksY } = chunkPosition;

    const chunkPxWidth = chunkSize.tilesWidth * tileSize.pxWidth;
    const chunkPxHeight = chunkSize.tilesHeight * tileSize.pxHeight;

    const gamePxX = chunksX * chunkPxWidth;
    const gamePxY = chunksY * chunkPxHeight;

    return {
        gamePxX,
        gamePxY,
    };
}
