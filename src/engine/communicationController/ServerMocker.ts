import { addVectorToGamePxPosition } from "../../logic/addVectorToGamePxPosition";
import { getBufferedGamePxRectangle } from "../../logic/getBufferedGamePxRectangle";
import { getChunkPosition } from "../../logic/getChunkPosition";
import { getChunkRectangleFromGameRectangle } from "../../logic/getChunkRectangleFromGameRectangle";
import { getChunksInChunkRectangle } from "../../logic/getChunksInChunkRectangle";
import { getDirectionUnitVector } from "../../logic/getDirectionUnitVector";
import { getGamePxRectangleOfChunk } from "../../logic/getGamePxRectangleOfChunk";
import { getViewPortGamePxRectangle } from "../../logic/getViewPortGamePxRectangle";
import { isChunkWithinRectangle } from "../../logic/isChunkWithinRectangle";
import { isGamePositionWithinRectangle } from "../../logic/isGamePositionWithinRectangle";
import { multiplyVector } from "../../logic/multiplyVector";
import { ChunkPosition } from "../../models/ChunkPosition";
import { ChunkRectangle } from "../../models/ChunkRectangle";
import { Direction } from "../../models/Direction";
import { GamePxPosition } from "../../models/GamePxPosition";
import { GamePxRectangle } from "../../models/GamePxRectangle";
import { VisualConsts } from "../../models/VisualConsts";
import { randomNumber } from "../../utils/randomNumber";
import { sprites } from "../../visual/sprites/sprites";
import { CommunicationController } from "./CommunicationController";
import { SpriteAppeared } from "./models/SpriteAppeared";

export class ServerMocker {
    private visualConsts: VisualConsts;
    private communicationController: CommunicationController;
    private stepSizePx = 50;

    private playerPosition: GamePxPosition = { gamePxX: 0, gamePxY: 0 };
    private chunks = new Map<string, ChunkPosition>();

    private spritesByChunk = new Map<string, SpriteAppeared[]>();

    constructor(visualConsts: VisualConsts, communicationController: CommunicationController) {
        this.visualConsts = visualConsts;
        this.communicationController = communicationController;
    }

    public inputPlayerMove(direction: Direction) {
        const unitVector = getDirectionUnitVector(direction);
        const moveVector = multiplyVector(unitVector, this.stepSizePx);

        const newPlayerPosition = addVectorToGamePxPosition(this.playerPosition, moveVector);
        this.changePlayerPosition(newPlayerPosition);
    }

    private changePlayerPosition(newPlayerPosition: GamePxPosition) {
        this.playerPosition = newPlayerPosition;
        this.communicationController.onPlayerPositionChanged.trigger(newPlayerPosition);

        this.syncChunks();
    }

    private async syncChunks() {
        const { chunkBufferPxSize } = this.visualConsts;

        const viewPort = getViewPortGamePxRectangle(this.visualConsts, this.playerPosition);
        const bufferedViewPort = getBufferedGamePxRectangle(viewPort, chunkBufferPxSize);

        const bufferedChunkRectangle = getChunkRectangleFromGameRectangle(this.visualConsts, bufferedViewPort);

        this.removeChunksOutside(bufferedChunkRectangle);
        this.addMissingChunksInside(bufferedChunkRectangle);
    }

    private removeChunksOutside(rectangle: ChunkRectangle) {
        const chunks = Array.from(this.chunks.values());

        const chunksToRemove = chunks.filter(q => !isChunkWithinRectangle(q, rectangle));

        this.removeChunks(chunksToRemove);
    }

    private addMissingChunksInside({ topLeft, bottomRight }: ChunkRectangle) {
        const chunksToAdd: ChunkPosition[] = [];

        for (let chunksX = topLeft.chunksX; chunksX <= bottomRight.chunksX; chunksX++) {
            for (let chunksY = topLeft.chunksY; chunksY <= bottomRight.chunksY; chunksY++) {
                const chunkPosition: ChunkPosition = { chunksX, chunksY };
                const key = this.chunkKey(chunkPosition);

                const alreadyExists = this.chunks.has(key);
                if (alreadyExists) {
                    continue;
                }

                chunksToAdd.push(chunkPosition);

                // TODO: temp:
                const newSprites: SpriteAppeared[] = [];
                const rectangle = getGamePxRectangleOfChunk(this.visualConsts, chunkPosition);
                for (let i = 0; i < 10; i++) {
                    const position: GamePxPosition = {
                        gamePxX: randomNumber(rectangle.topLeft.gamePxX, rectangle.bottomRight.gamePxX),
                        gamePxY: randomNumber(rectangle.topLeft.gamePxY, rectangle.bottomRight.gamePxY),
                    };
                    newSprites.push({
                        sprite: sprites.palm,
                        position,
                    });
                }
                this.communicationController.onSpritesAppeared.trigger(newSprites);
                //
            }
        }

        this.addChunks(chunksToAdd);
        this._generateExampleSprites(chunksToAdd);
    }

    // TODO: TEMP
    private _generateExampleSprites(chunks: ChunkPosition[]) {
        const newSprites: SpriteAppeared[] = [];

        for (const chunk of chunks) {
            const rectangle = getGamePxRectangleOfChunk(this.visualConsts, chunk);
            for (let i = 0; i < 10; i++) {
                const position: GamePxPosition = {
                    gamePxX: randomNumber(rectangle.topLeft.gamePxX, rectangle.bottomRight.gamePxX),
                    gamePxY: randomNumber(rectangle.topLeft.gamePxY, rectangle.bottomRight.gamePxY),
                };
                newSprites.push({
                    sprite: sprites.palm,
                    position,
                });
            }
        }

        this.communicationController.onSpritesAppeared.trigger(newSprites);
    }

    private removeChunks(chunksToRemove: ChunkPosition[]) {
        const disappearedChunks: ChunkPosition[] = [];

        for (const chunk of chunksToRemove) {
            const key = this.chunkKey(chunk);

            const didExist = this.chunks.delete(key);
            if (!didExist) {
                continue;
            }

            disappearedChunks.push(chunk);
        }

        this.communicationController.onChunksDisappeared.trigger(disappearedChunks);
    }

    private addChunks(chunksToAdd: ChunkPosition[]) {
        const appearedChunks: ChunkPosition[] = [];

        for (const chunk of chunksToAdd) {
            const key = this.chunkKey(chunk);

            const alreadyExists = this.chunks.has(key);
            if (alreadyExists) {
                continue;
            }

            this.chunks.set(key, chunk);
            appearedChunks.push(chunk);
        }

        this.communicationController.onChunksAppeared.trigger(appearedChunks);
    }

    private getNewlyAppearedSpriteArea(oldPlayerPosition: GamePxPosition, newPlayerPosition: GamePxPosition) {
        const { spriteBufferPxSize } = this.visualConsts;

        const oldViewPort = getViewPortGamePxRectangle(this.visualConsts, oldPlayerPosition);
        const oldBufferedViewPort = getBufferedGamePxRectangle(oldViewPort, spriteBufferPxSize);

        const newViewPort = getViewPortGamePxRectangle(this.visualConsts, newPlayerPosition);
        const newBufferedViewPort = getBufferedGamePxRectangle(newViewPort, spriteBufferPxSize);
    }

    private getSpritesFromArea(rectangle: GamePxRectangle): SpriteAppeared[] {
        const chunkRectangle = getChunkRectangleFromGameRectangle(this.visualConsts, rectangle);
        const chunks = getChunksInChunkRectangle(chunkRectangle);

        const sprites: SpriteAppeared[] = [];
        for (const chunk of chunks) {
            const key = this.chunkKey(chunk);

            const chunkSprites = this.spritesByChunk.get(key) || [];
            const areaChunkSprites = chunkSprites.filter(sprite =>
                isGamePositionWithinRectangle(sprite.position, rectangle)
            );

            sprites.push(...areaChunkSprites);
        }

        return sprites;
    }

    private sendNewSprites(sprites: SpriteAppeared[]) {
        this.communicationController.onSpritesAppeared.trigger(sprites);
    }

    private chunkKey({ chunksX, chunksY }: ChunkPosition): string {
        return `${chunksX}#${chunksY}`;
    }
}
