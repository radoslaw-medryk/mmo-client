import { ChunkPosition } from "../../models/ChunkPosition";
import { Chunk } from "../chunk/Chunk";
import { Mountable } from "../mountable/Mountable";
import { VisualConsts } from "../../models/VisualConsts";
import { getChunkPosition } from "../../logic/getChunkPosition";
import { getViewPortGamePxRectangle } from "../../logic/getViewPortGamePxRectangle";
import { GamePxPosition } from "../../models/GamePxPosition";
import { GamePxRectangle } from "../../models/GamePxRectangle";
import { Sprite } from "../sprites/Sprite";
import { getInChunkPxPosition } from "../../logic/getInChunkPxPosition";

export class Layer extends Mountable {
    private container: HTMLDivElement;
    private chunks = new Map<string, Chunk>();

    private visualConsts: VisualConsts;

    constructor(visualConsts: VisualConsts, center: GamePxPosition) {
        super();

        this.visualConsts = visualConsts;

        this.container = document.createElement("div");
        this.container.className = "mmo-layer";

        this.centerOn(center);
    }

    public mount(parent: HTMLElement) {
        super.mount(parent, this.container);
    }

    public unmount() {
        super.unmount();
    }

    public addChunk(chunkPosition: ChunkPosition) {
        const key = this.getChunkMapKey(chunkPosition);

        const chunk = new Chunk(this.visualConsts, {
            position: chunkPosition,
        });
        chunk.mount(this.container);

        this.chunks.set(key, chunk);
    }

    public removeChunk(chunkPosition: ChunkPosition) {
        const key = this.getChunkMapKey(chunkPosition);
        this.chunks.delete(key);
    }

    public getChunkAt(chunkPosition: ChunkPosition) {
        const key = this.getChunkMapKey(chunkPosition);
        return this.chunks.get(key);
    }

    public getAllChunks() {
        return Array.from(this.chunks.values());
    }

    public async centerOn(gamePxPosition: GamePxPosition) {
        const { topLeft } = getViewPortGamePxRectangle(this.visualConsts, gamePxPosition);

        this.container.style.left = `${-topLeft.gamePxX}px`;
        this.container.style.top = `${-topLeft.gamePxY}px`;
    }

    public async drawSprite(sprite: Sprite, gamePxPosition: GamePxPosition) {
        const topLeft = gamePxPosition;
        const bottomRight: GamePxPosition = {
            gamePxX: topLeft.gamePxX + sprite.pxSize.pxWidth,
            gamePxY: topLeft.gamePxY + sprite.pxSize.pxHeight,
        };

        const gamePxRectangle: GamePxRectangle = {
            topLeft,
            bottomRight,
        };

        const overlapingChunkPositions = this.getOverlapingChunkPositions(gamePxRectangle);
        await Promise.all(
            overlapingChunkPositions.map(chunkPosition => this.drawSpriteOnChunk(sprite, gamePxPosition, chunkPosition))
        );
    }

    private async drawSpriteOnChunk(sprite: Sprite, gamePxPosition: GamePxPosition, chunkPosition: ChunkPosition) {
        const chunk = this.getChunkAt(chunkPosition);
        if (!chunk) {
            console.warn(`In drawSpriteOnChunk haven't found chunk at ${JSON.stringify(chunkPosition)}!`);
            return;
        }

        const inChunkPxPosition = getInChunkPxPosition(this.visualConsts, chunkPosition, gamePxPosition);

        await chunk.drawSprite(sprite, inChunkPxPosition);
    }

    private getOverlapingChunkPositions(gamePxRectangle: GamePxRectangle): ChunkPosition[] {
        const topLeftChunk = getChunkPosition(this.visualConsts, gamePxRectangle.topLeft);
        const bottomRightChunk = getChunkPosition(this.visualConsts, gamePxRectangle.bottomRight);

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

    private getChunkMapKey({ chunksX, chunksY }: ChunkPosition): string {
        return `${chunksX}#${chunksY}`;
    }
}
