import { Canvas } from "../canvas/Canvas";
import { Mountable } from "../mountable/Mountable";
import { VisualConsts } from "../../models/VisualConsts";
import { ChunkSettings } from "./ChunkSettings";
import { PxPosition } from "../../models/PxPosition";
import { Sprite } from "../sprites/Sprite";
import { GamePxRectangle } from "../../models/GamePxRectangle";
import { getGamePxRectangleOfChunk } from "../../logic/getGamePxRectangleOfChunk";

export class Chunk extends Mountable {
    private container: HTMLDivElement;
    private canvas: Canvas;

    public chunkSettings: ChunkSettings;
    public gamePxRectangle: GamePxRectangle;

    constructor(visualConsts: VisualConsts, chunkSettings: ChunkSettings) {
        super();

        this.chunkSettings = chunkSettings;

        this.container = document.createElement("div");
        this.container.className = "mmo-chunk";

        this.gamePxRectangle = getGamePxRectangleOfChunk(visualConsts, chunkSettings.position);
        const { topLeft } = this.gamePxRectangle;

        this.container.style.left = `${topLeft.gamePxX}px`;
        this.container.style.top = `${topLeft.gamePxY}px`;

        this.canvas = new Canvas(visualConsts);
        this.canvas.mount(this.container);
    }

    public mount(parent: HTMLElement) {
        super.mount(parent, this.container);
    }

    public unmount() {
        super.unmount();
    }

    public async drawSprite(sprite: Sprite, position: PxPosition) {
        await this.canvas.drawSprite(sprite, position);
    }
}
