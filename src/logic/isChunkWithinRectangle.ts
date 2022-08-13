import { ChunkPosition } from "../models/ChunkPosition";
import { ChunkRectangle } from "../models/ChunkRectangle";
import { isBetween } from "../utils/isBetween";

export function isChunkWithinRectangle({ chunksX, chunksY }: ChunkPosition, { topLeft, bottomRight }: ChunkRectangle) {
    return (
        isBetween(topLeft.chunksX, chunksX, bottomRight.chunksX) &&
        isBetween(topLeft.chunksY, chunksY, bottomRight.chunksY)
    );
}
