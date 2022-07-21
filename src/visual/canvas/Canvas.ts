import { PxPosition } from "../../models/PxPosition";
import { sure } from "../../utils/sure";
import { Mountable } from "../mountable/Mountable";
import { Sprite } from "../sprites/Sprite";
import { VisualConsts } from "../../models/VisualConsts";

export class Canvas extends Mountable {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(visualConsts: VisualConsts) {
        super();

        this.canvas = document.createElement("canvas");

        const { chunkSize } = visualConsts;

        this.canvas.width = chunkSize.pxWidth;
        this.canvas.height = chunkSize.pxHeight;

        this.context = sure(this.canvas.getContext("2d"));
    }

    public mount(parent: HTMLElement) {
        super.mount(parent, this.canvas);
    }

    public unmount() {
        super.unmount();
    }

    // public __fillTile(tileX: number, tileY: number, color: string) {
    //     const { tileSize } = this.visualConsts;

    //     const canvasPxX = tileSize.pxWidth * tileX;
    //     const canvasPxY = tileSize.pxHeight * tileY;

    //     this.context.fillStyle = color;
    //     this.context.fillRect(canvasPxX, canvasPxY, tileSize.pxWidth, tileSize.pxHeight);

    //     const text = `${tileX} / ${tileY}`;
    //     this.context.strokeStyle = "#444";
    //     this.context.fillStyle = "#fff";
    //     this.context.font = "32px Arial";
    //     this.context.fillText(text, canvasPxX + 20, canvasPxY + 60);
    //     this.context.strokeText(text, canvasPxX + 20, canvasPxY + 60);
    // }

    public async drawSprite(sprite: Sprite, position: PxPosition) {
        await sprite.drawOnContext(this.context, position);
    }
}
