import { ChunkPosition } from "../../models/ChunkPosition";
import { GamePxPosition } from "../../models/GamePxPosition";
import { VisualConsts } from "../VisualConsts";

export function getChunkPosition(visualConsts: VisualConsts, gamePxPosition: GamePxPosition): ChunkPosition {
    const { chunkSize, tileSize } = visualConsts;

    const chunkPxWidth = chunkSize.tilesWidth * tileSize.pxWidth;
    const chunkPxHeight = chunkSize.tilesHeight * tileSize.pxHeight;

    const { gamePxX, gamePxY } = gamePxPosition;
    const chunksX = Math.floor(gamePxX / chunkPxWidth);
    const chunksY = Math.floor(gamePxY / chunkPxHeight);

    return {
        chunksX,
        chunksY,
    };
}
