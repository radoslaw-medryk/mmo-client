import { sure } from "../../../utils/sure";
import { CanvasSettings } from "./CanvasSettings";

export class Canvas {
    private canvasSettings: CanvasSettings;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvasSettings: CanvasSettings) {
        this.canvasSettings = canvasSettings;

        this.canvas = document.createElement("canvas");

        const { edgeTilesCount, tileSizePx } = this.canvasSettings;
        const edgePx = edgeTilesCount * tileSizePx;

        this.canvas.width = edgePx;
        this.canvas.height = edgePx;

        this.context = sure(this.canvas.getContext("2d"));
    }

    public mount(parent: HTMLElement) {
        parent.appendChild(this.canvas);
    }

    public fillTile(tileX: number, tileY: number, color: string) {
        const { tileSizePx } = this.canvasSettings;
        const canvasPxX = tileSizePx * tileX;
        const canvasPxY = tileSizePx * tileY;

        this.context.fillStyle = color;
        this.context.fillRect(canvasPxX, canvasPxY, tileSizePx, tileSizePx);
    }
}
