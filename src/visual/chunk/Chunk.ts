import { getGamePxPosition } from "../logic/getGamePxPosition";
import { Canvas } from "../canvas/Canvas";
import { Mountable } from "../mountable/Mountable";
import { VisualConsts } from "../VisualConsts";
import { ChunkSettings } from "./ChunkSettings";

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

    public fillTile(tileX: number, tileY: number, color: string) {
        this.canvas.fillTile(tileX, tileY, color);
    }
}
