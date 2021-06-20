import { sure } from "../../utils/sure";
import { Mountable } from "../mountable/Mountable";
import { VisualConsts } from "../VisualConsts";

export class Canvas extends Mountable {
    private visualConsts: VisualConsts;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(visualConsts: VisualConsts) {
        super();

        this.visualConsts = visualConsts;

        this.canvas = document.createElement("canvas");

        const { tileSize, chunkSize } = visualConsts;
        const canvasPxSizeWidth = tileSize.pxWidth * chunkSize.tilesWidth;
        const canvasPxSizeHeight = tileSize.pxHeight * chunkSize.tilesHeight;

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
        const { tileSize } = this.visualConsts;

        const canvasPxX = tileSize.pxWidth * tileX;
        const canvasPxY = tileSize.pxHeight * tileY;

        this.context.fillStyle = color;
        this.context.fillRect(canvasPxX, canvasPxY, tileSize.pxWidth, tileSize.pxHeight);
    }
}
