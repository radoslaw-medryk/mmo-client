import { ChunkPosition } from "../models/ChunkPosition";
import { ChunkRectangle } from "../models/ChunkRectangle";

export function getChunksInChunkRectangle({ topLeft, bottomRight }: ChunkRectangle): ChunkPosition[] {
    const chunks: ChunkPosition[] = [];

    for (let chunksX = topLeft.chunksX; chunksX <= bottomRight.chunksX; chunksX++) {
        for (let chunksY = topLeft.chunksY; chunksY <= bottomRight.chunksY; chunksY++) {
            chunks.push({
                chunksX,
                chunksY,
            });
        }
    }

    return chunks;
}
