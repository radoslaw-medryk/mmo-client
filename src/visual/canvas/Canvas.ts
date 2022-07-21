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

    public async drawSprite(sprite: Sprite, position: PxPosition) {
        await sprite.drawOnContext(this.context, position);
    }
}
