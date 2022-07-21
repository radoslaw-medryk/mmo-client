import { ChunkPosition } from "../models/ChunkPosition";
import { GamePxPosition } from "../models/GamePxPosition";
import { PxPosition } from "../models/PxPosition";
import { VisualConsts } from "../models/VisualConsts";
import { getGamePxRectangleOfChunk } from "./getGamePxRectangleOfChunk";

export function getInChunkPxPosition(
    visualConsts: VisualConsts,
    chunkPosition: ChunkPosition,
    gamePxPosition: GamePxPosition
) {
    const chunkGamePxRectangle = getGamePxRectangleOfChunk(visualConsts, chunkPosition);

    const pxPosition: PxPosition = {
        pxX: gamePxPosition.gamePxX - chunkGamePxRectangle.topLeft.gamePxX,
        pxY: gamePxPosition.gamePxY - chunkGamePxRectangle.topLeft.gamePxY,
    };

    return pxPosition;
}
