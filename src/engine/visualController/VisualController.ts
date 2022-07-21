import { getBufferedGamePxRectangle } from "../../logic/getBufferedGamePxRectangle";
import { getChunkPosition } from "../../logic/getChunkPosition";
import { getGamePxRectangleOfChunk } from "../../logic/getGamePxRectangleOfChunk";
import { getViewPortGamePxRectangle } from "../../logic/getViewPortGamePxRectangle";
import { ChunkPosition } from "../../models/ChunkPosition";
import { ChunkRectangle } from "../../models/ChunkRectangle";
import { GamePxPosition } from "../../models/GamePxPosition";
import { VisualConsts } from "../../models/VisualConsts";
import { isBetween } from "../../utils/isBetween";
import { randomNumber } from "../../utils/randomNumber";
import { Sprite } from "../../visual/sprites/Sprite";
import { sprites } from "../../visual/sprites/sprites";
import { ViewPort } from "../../visual/viewport/ViewPort";

export class VisualController {
    private visualConsts: VisualConsts;
    private viewPort: ViewPort;

    private center: GamePxPosition = { gamePxX: 0, gamePxY: 0 };

    constructor(visualConsts: VisualConsts) {
        this.visualConsts = visualConsts;
        this.viewPort = new ViewPort(visualConsts, this.center);
    }

    public mountViewPort(parent: HTMLElement) {
        this.viewPort.mount(parent);
    }

    public async centerOn(gamePxPosition: GamePxPosition) {
        this.center = {
            gamePxX: gamePxPosition.gamePxX,
            gamePxY: gamePxPosition.gamePxY,
        };

        this.viewPort.centerOn(gamePxPosition);

        await this.syncChunks();
    }

    public async drawSprite(sprite: Sprite, gamePxPosition: GamePxPosition) {
        const layer = this.viewPort.getLayer();
        await layer.drawSprite(sprite, gamePxPosition);
    }

    private async syncChunks() {
        const viewPort = getViewPortGamePxRectangle(this.visualConsts, this.center);
        const bufferedViewPort = getBufferedGamePxRectangle(this.visualConsts, viewPort);

        const bufferedChunkRectangle: ChunkRectangle = {
            topLeft: getChunkPosition(this.visualConsts, bufferedViewPort.topLeft),
            bottomRight: getChunkPosition(this.visualConsts, bufferedViewPort.bottomRight),
        };

        this.removeChunksOutside(bufferedChunkRectangle);
        this.createMissingChunksInside(bufferedChunkRectangle);
    }

    private removeChunksOutside(rectangle: ChunkRectangle) {
        const layer = this.viewPort.getLayer();
        const chunks = layer.getAllChunks();

        for (const chunk of chunks) {
            const chunkPosition = chunk.chunkSettings.position;
            const isInside = this.isChunkWithinRectangle(chunkPosition, rectangle);
            if (isInside) {
                continue;
            }

            layer.removeChunk(chunkPosition);
        }
    }

    private createMissingChunksInside({ topLeft, bottomRight }: ChunkRectangle) {
        const layer = this.viewPort.getLayer();

        for (let chunksX = topLeft.chunksX; chunksX <= bottomRight.chunksX; chunksX++) {
            for (let chunksY = topLeft.chunksY; chunksY <= bottomRight.chunksY; chunksY++) {
                const chunkPosition: ChunkPosition = { chunksX, chunksY };

                const existingChunk = layer.getChunkAt(chunkPosition);
                if (existingChunk) {
                    continue;
                }

                layer.addChunk(chunkPosition);

                // TODO: temp:
                const rectangle = getGamePxRectangleOfChunk(this.visualConsts, chunkPosition);
                for (let i = 0; i < 10; i++) {
                    const pos: GamePxPosition = {
                        gamePxX: randomNumber(rectangle.topLeft.gamePxX, rectangle.bottomRight.gamePxX),
                        gamePxY: randomNumber(rectangle.topLeft.gamePxY, rectangle.bottomRight.gamePxY),
                    };
                    this.drawSprite(sprites.palm, pos);
                }
                //
            }
        }
    }

    private isChunkWithinRectangle({ chunksX, chunksY }: ChunkPosition, { topLeft, bottomRight }: ChunkRectangle) {
        return (
            isBetween(topLeft.chunksX, chunksX, bottomRight.chunksX) &&
            isBetween(topLeft.chunksY, chunksY, bottomRight.chunksY)
        );
    }
}
