import { Canvas } from "../canvas/Canvas";
import { Mountable } from "../mountable/Mountable";
import { VisualConsts } from "../VisualConsts";
import { ChunkSettings } from "./ChunkSettings";
import { randomColor } from "../../utils/randomColor";
import { PxPosition } from "../../models/PxPosition";
import { Sprite } from "../sprites/Sprite";
import { GamePxRectangle } from "../../models/GamePxRectangle";
import { getGamePxRectangleOfChunk } from "../logic/getGamePxRectangleOfChunk";
import { LayerElement } from "../element/LayerElement";
import { getInChunkPxRectangle } from "../logic/getInChunkPxRectangle";

export class Chunk extends Mountable {
    private visualConsts: VisualConsts;
    private container: HTMLDivElement;
    private canvas: Canvas;

    public chunkSettings: ChunkSettings;
    public gamePxRectangle: GamePxRectangle;
    public elements: LayerElement[] = [];

    constructor(visualConsts: VisualConsts, chunkSettings: ChunkSettings) {
        super();

        this.visualConsts = visualConsts;
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

    public addElement(element: LayerElement) {
        this.elements.push(element);
    }

    public async drawElements() {
        for (const element of this.elements) {
            const { topLeft } = getInChunkPxRectangle(
                this.visualConsts,
                this.chunkSettings.position,
                element.gamePxRectangle
            );

            await this.drawSprite(element.elementSettings.sprite, topLeft);
        }
    }

    public async __fillChunk() {
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 6; y++) {
                this.__fillTile(x, y, randomColor());
            }
        }
    }

    private async drawSprite(sprite: Sprite, position: PxPosition) {
        await this.canvas.drawSprite(sprite, position);
    }

    private __fillTile(tileX: number, tileY: number, color: string) {
        this.canvas.__fillTile(tileX, tileY, color);
    }
}
