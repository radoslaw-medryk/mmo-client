import { ChunkPosition } from "../models/ChunkPosition";
import { GamePxRectangle } from "../models/GamePxRectangle";
import { PxPosition } from "../models/PxPosition";
import { PxRectangle } from "../models/PxRectangle";
import { VisualConsts } from "../models/VisualConsts";
import { getInChunkPxPosition } from "./getInChunkPxPosition";

export function getInChunkPxRectangle(
    visualConsts: VisualConsts,
    chunkPosition: ChunkPosition,
    gamePxRectangle: GamePxRectangle
): PxRectangle {
    const width = gamePxRectangle.bottomRight.gamePxX - gamePxRectangle.topLeft.gamePxX;
    const height = gamePxRectangle.bottomRight.gamePxY - gamePxRectangle.topLeft.gamePxY;

    const topLeft = getInChunkPxPosition(visualConsts, chunkPosition, gamePxRectangle.topLeft);

    const bottomRight: PxPosition = {
        pxX: topLeft.pxX + width,
        pxY: topLeft.pxY + height,
    };

    return {
        topLeft,
        bottomRight,
    };
}
