import { Canvas } from "../canvas/Canvas";
import { Mountable } from "../mountable/Mountable";
import { ChunkSettings } from "./ChunkSettings";

export class Chunk extends Mountable {
    private chunkSettings: ChunkSettings;
    private container: HTMLDivElement;
    private canvas: Canvas;

    constructor(chunkSettings: ChunkSettings) {
        super();

        this.chunkSettings = chunkSettings;
        this.container = document.createElement("div");

        const { canvasSettings } = chunkSettings;
        this.canvas = new Canvas(canvasSettings);
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
