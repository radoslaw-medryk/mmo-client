import { sure } from "../../utils/sure";
import { Mountable } from "../mountable/Mountable";
import { CanvasSettings } from "./CanvasSettings";

export class Canvas extends Mountable {
    private canvasSettings: CanvasSettings;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvasSettings: CanvasSettings) {
        super();

        this.canvasSettings = canvasSettings;

        this.canvas = document.createElement("canvas");

        const { tileSize, canvasSize } = this.canvasSettings;
        const canvasPxSizeWidth = tileSize.pxWidth * canvasSize.tilesWidth;
        const canvasPxSizeHeight = tileSize.pxHeight * canvasSize.tilesHeight;

        this.canvas.width = canvasPxSizeWidth;
        this.canvas.height = canvasPxSizeHeight;

        this.context = sure(this.canvas.getContext("2d"));
    }

    public mount(parent: HTMLElement) {
        super.mount(parent, this.canvas);
    }

    public unmount() {
        super.unmount(this.canvas);
    }

    public fillTile(tileX: number, tileY: number, color: string) {
        const { tileSize } = this.canvasSettings;
        const canvasPxX = tileSize.pxWidth * tileX;
        const canvasPxY = tileSize.pxHeight * tileY;

        this.context.fillStyle = color;
        this.context.fillRect(canvasPxX, canvasPxY, tileSize.pxWidth, tileSize.pxHeight);
    }
}
