import { ChunkPosition } from "../../models/ChunkPosition";
import { GamePxRectangle } from "../../models/GamePxRectangle";
import { PxPosition } from "../../models/PxPosition";
import { PxRectangle } from "../../models/PxRectangle";
import { VisualConsts } from "../VisualConsts";
import { getGamePxRectangleOfChunk } from "./getGamePxRectangleOfChunk";

export function getInChunkPxRectangle(
    visualConsts: VisualConsts,
    chunkPosition: ChunkPosition,
    gamePxRectangle: GamePxRectangle
): PxRectangle {
    const chunkGamePxRectangle = getGamePxRectangleOfChunk(visualConsts, chunkPosition);

    const width = gamePxRectangle.bottomRight.gamePxX - gamePxRectangle.topLeft.gamePxX;
    const height = gamePxRectangle.bottomRight.gamePxY - gamePxRectangle.topLeft.gamePxY;

    const topLeft: PxPosition = {
        pxX: gamePxRectangle.topLeft.gamePxX - chunkGamePxRectangle.topLeft.gamePxX,
        pxY: gamePxRectangle.topLeft.gamePxY - chunkGamePxRectangle.topLeft.gamePxY,
    };

    const bottomRight: PxPosition = {
        pxX: topLeft.pxX + width,
        pxY: topLeft.pxY + height,
    };

    return {
        topLeft,
        bottomRight,
    };
}
