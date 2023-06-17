import { ChunkRectangle } from "../models/ChunkRectangle";
import { GamePxRectangle } from "../models/GamePxRectangle";
import { VisualConsts } from "../models/VisualConsts";
import { getChunkPosition } from "./getChunkPosition";

export function getChunkRectangleFromGameRectangle(
    visualConsts: VisualConsts,
    gamePxRectangle: GamePxRectangle
): ChunkRectangle {
    const chunkRectangle: ChunkRectangle = {
        topLeft: getChunkPosition(visualConsts, gamePxRectangle.topLeft),
        bottomRight: getChunkPosition(visualConsts, gamePxRectangle.bottomRight),
    };

    return chunkRectangle;
}
