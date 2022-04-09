import { ChunkPosition } from "../../models/ChunkPosition";
import { randomColor } from "../../utils/randomColor";
import { Chunk } from "../chunk/Chunk";
import { Mountable } from "../mountable/Mountable";
import { VisualConsts } from "../VisualConsts";
import { LayerState } from "./LayerState";
import { getChunkPosition } from "../logic/getChunkPosition";
import { getViewPortGamePxCoords } from "../logic/getViewPortGamePxCoords";
import { GamePxPosition } from "../../models/GamePxPosition";
import { getBufferedViewPortGamePxCoords } from "../logic/getBufferedViewPortGamePxCoords";
import { PxPosition } from "../../models/PxPosition";
import { randomNumber } from "../../utils/randomNumber";
import { sprites } from "../sprites/sprites";
import { Sprite } from "../sprites/Sprite";
import { single } from "../../utils/single";
import { getGamePxPosition } from "../logic/getGamePxPosition";
import { LayerElement } from "../element/LayerElement";
import { GamePxRectangle } from "../../models/GamePxRectangle";
import { getContainingRectangleFromRectangles } from "../logic/getContainingRectangleFromRectangles";

export class Layer extends Mountable {
    private container: HTMLDivElement;
    private chunks: Chunk[] = [];
    private elements: LayerElement[] = [];

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
        super.unmount(this.container);
    }

    public centerOn(position: GamePxPosition) {
        const { gamePxX, gamePxY } = position;
        this.layerState.center.gamePxX = gamePxX;
        this.layerState.center.gamePxY = gamePxY;

        this.syncChunks();

        const { topLeft } = getViewPortGamePxCoords(this.visualConsts, this.layerState);

        this.container.style.left = `${-topLeft.gamePxX}px`;
        this.container.style.top = `${-topLeft.gamePxY}px`;
    }

    public addElement(element: LayerElement) {
        this.elements.push(element);
    }

    public async drawSprite(sprite: Sprite, gamePosition: GamePxPosition) {
        const size = await sprite.getSize();

        const topLeftGamePosition = gamePosition;
        const bottomRightGamePosition: GamePxPosition = {
            gamePxX: gamePosition.gamePxX + size.pxWidth,
            gamePxY: gamePosition.gamePxY + size.pxHeight,
        };

        const topLeftChunkPosition = getChunkPosition(this.visualConsts, topLeftGamePosition);
        const bottomRightChunkPosition = getChunkPosition(this.visualConsts, bottomRightGamePosition);

        for (let chunksX = topLeftChunkPosition.chunksX; chunksX <= bottomRightChunkPosition.chunksX; chunksX++) {
            for (let chunksY = topLeftChunkPosition.chunksY; chunksY <= bottomRightChunkPosition.chunksY; chunksY++) {
                const chunkPosition = { chunksX, chunksY };
                await this.tryDrawSpriteOnChunk(sprite, gamePosition, chunkPosition);
            }
        }
    }

    private segregateElements() {
        const overlaping: LayerElement[] = [];
        const notOverlaping: LayerElement[] = [];

        const viewPort = getViewPortGamePxCoords(this.visualConsts, this.layerState);
        const bufferedViewPort = getBufferedViewPortGamePxCoords(this.visualConsts, viewPort);

        for (const element of this.elements) {
            const isOverlaping = element.overlapsArea(bufferedViewPort);
            if (isOverlaping) {
                overlaping.push(element);
            } else {
                notOverlaping.push(element);
            }
        }

        return {
            overlaping,
            notOverlaping,
        };
    }

    private getContainingRectangle(elements: LayerElement[]): GamePxRectangle | undefined {
        const rectangles = elements.map(q => q.elementSettings.rectangle);

        return getContainingRectangleFromRectangles(rectangles);
    }

    private async tryDrawSpriteOnChunk(sprite: Sprite, gamePosition: GamePxPosition, chunkPosition: ChunkPosition) {
        const chunk = this.getChunkAt(chunkPosition);
        if (!chunk) {
            return;
        }

        const chunkGamePosition = getGamePxPosition(this.visualConsts, chunkPosition);

        const inChunkPxPosition: PxPosition = {
            pxX: gamePosition.gamePxX - chunkGamePosition.gamePxX,
            pxY: gamePosition.gamePxY - chunkGamePosition.gamePxY,
        };

        await chunk.drawSprite(sprite, inChunkPxPosition);
    }

    private syncChunks() {
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

                this.__drawRandomContent(chunk);

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

    private async __drawRandomContent(chunk: Chunk) {
        chunk.__fillChunk();

        const { chunkSize, tileSize } = this.visualConsts;
        const chunkPxWidth = chunkSize.tilesWidth * tileSize.pxWidth;
        const chunkPxHeight = chunkSize.tilesHeight * tileSize.pxHeight;

        const chunkGamePosition = getGamePxPosition(this.visualConsts, chunk.chunkSettings.position);

        for (let i = 0; i < 5; i++) {
            await this.drawSprite(sprites.palm, {
                gamePxX: chunkGamePosition.gamePxX + randomNumber(0, chunkPxWidth),
                gamePxY: chunkGamePosition.gamePxY + randomNumber(0, chunkPxHeight),
            });
        }
    }
}
