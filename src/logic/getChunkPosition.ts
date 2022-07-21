import { ChunkPosition } from "../models/ChunkPosition";
import { GamePxPosition } from "../models/GamePxPosition";
import { VisualConsts } from "../models/VisualConsts";

export function getChunkPosition(visualConsts: VisualConsts, gamePxPosition: GamePxPosition): ChunkPosition {
    const { chunkSize } = visualConsts;

    const { gamePxX, gamePxY } = gamePxPosition;
    const chunksX = Math.floor(gamePxX / chunkSize.pxWidth);
    const chunksY = Math.floor(gamePxY / chunkSize.pxHeight);

    return {
        chunksX,
        chunksY,
    };
}
