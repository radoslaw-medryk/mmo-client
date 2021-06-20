import { ChunkPosition } from "../../models/ChunkPosition";
import { randomColor } from "../../utils/randomColor";
import { Chunk } from "../chunk/Chunk";
import { Mountable } from "../mountable/Mountable";
import { VisualConsts } from "../VisualConsts";
import { LayerState } from "./LayerState";
import { getChunkPosition } from "./logic/getChunkPosition";
import { getViewPortGamePxCoords } from "./logic/getViewPortGamePxCoords";

export class Layer extends Mountable {
    private container: HTMLDivElement;
    private chunks: Chunk[] = [];

    private visualConsts: VisualConsts;
    private layerState: LayerState;

    constructor(visualConsts: VisualConsts) {
        super();

        this.visualConsts = visualConsts;

        this.layerState = {
            center: {
                gamePxX: 0,
                gamePxY: 0,
            },
        };

        this.container = document.createElement("div");
    }

    public mount(parent: HTMLElement) {
        super.mount(parent, this.container);
    }

    public unmount() {
        super.unmount(this.container);
    }

    public syncChunks() {
        const viewPort = getViewPortGamePxCoords(this.visualConsts, this.layerState);

        const viewPortTopLeftChunk = getChunkPosition(this.visualConsts, viewPort.topLeft);
        const viewPortBottomRightChunk = getChunkPosition(this.visualConsts, viewPort.bottomRight);

        this.removeChunksOutside(viewPortTopLeftChunk, viewPortBottomRightChunk);
        this.createMissingChunksInside(viewPortTopLeftChunk, viewPortBottomRightChunk);
    }

    // TODO [RM]: temp only
    public __paintChunksRandomly() {
        for (const chunk of this.chunks) {
            for (let x = 0; x < 6; x++) {
                for (let y = 0; y < 6; y++) {
                    chunk.fillTile(x, y, randomColor());
                }
            }
        }
    }

    private removeChunksOutside(topLeftChunk: ChunkPosition, bottomRightChunk: ChunkPosition) {
        for (let i = this.chunks.length - 1; i >= 0; i--) {
            const chunk = this.chunks[i];
            const chunkPosX = chunk.chunkSettings.position.chunksX;
            const chunkPosY = chunk.chunkSettings.position.chunksY;

            if (
                chunkPosX < topLeftChunk.chunksX ||
                chunkPosX > bottomRightChunk.chunksX ||
                chunkPosY < topLeftChunk.chunksY ||
                chunkPosY > bottomRightChunk.chunksY
            ) {
                console.log(`>>> REMOVING CHUNK [${chunkPosX}, ${chunkPosY}]`);
                this.chunks.splice(i, 1);
            }
        }
    }

    private createMissingChunksInside(topLeftChunk: ChunkPosition, bottomRightChunk: ChunkPosition) {
        for (let chunkX = topLeftChunk.chunksX; chunkX < bottomRightChunk.chunksX; chunkX++) {
            for (let chunkY = topLeftChunk.chunksY; chunkY < bottomRightChunk.chunksY; chunkY++) {
                const isAlready = this.chunks.some(
                    q => q.chunkSettings.position.chunksX === chunkX && q.chunkSettings.position.chunksY === chunkY
                );

                if (isAlready) {
                    continue;
                }

                console.log(`>>> CREATING CHUNK [${chunkX}, ${chunkY}]`);

                const chunk = new Chunk(this.visualConsts, {
                    position: {
                        chunksX: chunkX,
                        chunksY: chunkY,
                    },
                });
                chunk.mount(this.container);
                this.chunks.push(chunk);
            }
        }
    }
}
