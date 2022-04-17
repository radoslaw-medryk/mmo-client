import { ChunkPosition } from "../../models/ChunkPosition";
import { Chunk } from "../chunk/Chunk";
import { Mountable } from "../mountable/Mountable";
import { VisualConsts } from "../VisualConsts";
import { LayerState } from "./LayerState";
import { getChunkPosition } from "../logic/getChunkPosition";
import { getViewPortGamePxCoords } from "../logic/getViewPortGamePxCoords";
import { GamePxPosition } from "../../models/GamePxPosition";
import { getBufferedViewPortGamePxCoords } from "../logic/getBufferedViewPortGamePxCoords";
import { randomNumber } from "../../utils/randomNumber";
import { sprites } from "../sprites/sprites";
import { single } from "../../utils/single";
import { LayerElement } from "../element/LayerElement";
import { getGamePxRectangleOfChunk } from "../logic/getGamePxRectangleOfChunk";
import { isSet } from "../../utils/isSet";

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
        this.container.className = "mmo-layer";

        this.centerOn(this.layerState.center);
    }

    public mount(parent: HTMLElement) {
        super.mount(parent, this.container);
    }

    public unmount() {
        super.unmount();
    }

    public async centerOn(position: GamePxPosition) {
        const { gamePxX, gamePxY } = position;
        this.layerState.center.gamePxX = gamePxX;
        this.layerState.center.gamePxY = gamePxY;

        await this.syncChunks();

        const { topLeft } = getViewPortGamePxCoords(this.visualConsts, this.layerState);

        this.container.style.left = `${-topLeft.gamePxX}px`;
        this.container.style.top = `${-topLeft.gamePxY}px`;
    }

    public addElement(element: LayerElement) {
        const overlapingChunkPositions = this.getOverlapingChunkPositions(element);
        const overlapingChunks = overlapingChunkPositions.map(this.getChunkAt).filter(isSet);

        for (const chunk of overlapingChunks) {
            chunk.addElement(element);
        }
    }

    private getOverlapingChunkPositions(element: LayerElement): ChunkPosition[] {
        const topLeftChunk = getChunkPosition(this.visualConsts, element.gamePxRectangle.topLeft);
        const bottomRightChunk = getChunkPosition(this.visualConsts, element.gamePxRectangle.bottomRight);

        const overlapingChnkPositions: ChunkPosition[] = [];

        for (let chunksX = topLeftChunk.chunksX; chunksX <= bottomRightChunk.chunksX; chunksX++) {
            for (let chunksY = topLeftChunk.chunksY; chunksY <= bottomRightChunk.chunksY; chunksY++) {
                overlapingChnkPositions.push({
                    chunksX,
                    chunksY,
                });
            }
        }

        return overlapingChnkPositions;
    }

    private async syncChunks() {
        const viewPort = getViewPortGamePxCoords(this.visualConsts, this.layerState);
        const bufferedViewPort = getBufferedViewPortGamePxCoords(this.visualConsts, viewPort);

        const bufferedViewPortTopLeftChunk = getChunkPosition(this.visualConsts, bufferedViewPort.topLeft);
        const bufferedViewPortBottomRightChunk = getChunkPosition(this.visualConsts, bufferedViewPort.bottomRight);

        this.removeChunksOutside(bufferedViewPortTopLeftChunk, bufferedViewPortBottomRightChunk);
        this.createMissingChunksInside(bufferedViewPortTopLeftChunk, bufferedViewPortBottomRightChunk);
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
                this.chunks[i].unmount();
                this.chunks.splice(i, 1);
            }
        }
    }

    private createMissingChunksInside(topLeftChunk: ChunkPosition, bottomRightChunk: ChunkPosition) {
        for (let chunksX = topLeftChunk.chunksX; chunksX <= bottomRightChunk.chunksX; chunksX++) {
            for (let chunksY = topLeftChunk.chunksY; chunksY <= bottomRightChunk.chunksY; chunksY++) {
                const existingChunk = this.getChunkAt({ chunksX, chunksY });
                if (existingChunk) {
                    continue;
                }

                console.log(`>>> CREATING CHUNK [${chunksX}, ${chunksY}]`);

                const chunk = new Chunk(this.visualConsts, {
                    position: {
                        chunksX,
                        chunksY,
                    },
                });
                chunk.mount(this.container);

                this.__addRandomContent(chunk);

                this.chunks.push(chunk);
            }
        }
    }

    private getChunkAt({ chunksX, chunksY }: ChunkPosition): Chunk | undefined {
        return single(
            this.chunks.filter(
                q => q.chunkSettings.position.chunksX === chunksX && q.chunkSettings.position.chunksY === chunksY
            )
        );
    }

    private async __addRandomContent(chunk: Chunk) {
        await chunk.__fillChunk();

        const { chunkSize, tileSize } = this.visualConsts;
        const chunkPxWidth = chunkSize.tilesWidth * tileSize.pxWidth;
        const chunkPxHeight = chunkSize.tilesHeight * tileSize.pxHeight;

        const { topLeft } = getGamePxRectangleOfChunk(this.visualConsts, chunk.chunkSettings.position);

        const elements: LayerElement[] = [];
        for (let i = 0; i < 5; i++) {
            const element = new LayerElement({
                sprite: sprites.palm,
                gamePxPosition: {
                    gamePxX: topLeft.gamePxX + randomNumber(0, chunkPxWidth),
                    gamePxY: topLeft.gamePxY + randomNumber(0, chunkPxHeight),
                },
            });
            await this.addElement(element);
        }
    }
}
