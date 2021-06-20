import { getGamePxPosition } from "../logic/getGamePxPosition";
import { Canvas } from "../canvas/Canvas";
import { Mountable } from "../mountable/Mountable";
import { VisualConsts } from "../VisualConsts";
import { ChunkSettings } from "./ChunkSettings";
import { randomColor } from "../../utils/randomColor";
import { PxPosition } from "../../models/PxPosition";
import { randomNumber } from "../../utils/randomNumber";
import { sprites } from "../sprites/sprites";

export class Chunk extends Mountable {
    private visualConsts: VisualConsts;
    private container: HTMLDivElement;
    private canvas: Canvas;

    public chunkSettings: ChunkSettings;

    constructor(visualConsts: VisualConsts, chunkSettings: ChunkSettings) {
        super();

        this.visualConsts = visualConsts;
        this.chunkSettings = chunkSettings;

        this.container = document.createElement("div");
        this.container.className = "mmo-chunk";

        const { gamePxX, gamePxY } = getGamePxPosition(visualConsts, chunkSettings.position);
        this.container.style.left = `${gamePxX}px`;
        this.container.style.top = `${gamePxY}px`;

        this.canvas = new Canvas(visualConsts);
        this.canvas.mount(this.container);
    }

    public mount(parent: HTMLElement) {
        super.mount(parent, this.container);
    }

    public unmount() {
        super.unmount(this.container);
    }

    public async __fillChunk() {
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 6; y++) {
                this.__fillTile(x, y, randomColor());
            }
        }

        const { chunkSize, tileSize } = this.visualConsts;
        const chunkPxWidth = chunkSize.tilesWidth * tileSize.pxWidth;
        const chunkPxHeight = chunkSize.tilesHeight * tileSize.pxHeight;

        for (let i = 0; i < 5; i++) {
            const position: PxPosition = {
                pxX: randomNumber(0, chunkPxWidth),
                pxY: randomNumber(0, chunkPxHeight),
            };
            await this.canvas.drawSprite(sprites.palm, position);
        }
    }

    private __fillTile(tileX: number, tileY: number, color: string) {
        this.canvas.__fillTile(tileX, tileY, color);
    }
}
