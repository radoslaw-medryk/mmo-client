import { PxPosition } from "../../models/PxPosition";
import { PxSize } from "../../models/PxSize";

export class Sprite {
    public pxSize: PxSize;

    private img: HTMLImageElement;
    private loaded: Promise<void>;

    constructor(path: string, pxSize: PxSize) {
        this.img = document.createElement("img");
        this.pxSize = pxSize;

        this.loaded = new Promise((resolve, reject) => {
            this.img.addEventListener("error", reject);
            this.img.addEventListener("load", () => resolve());
        });

        this.img.src = path;
        this.img.width = pxSize.pxWidth;
        this.img.height = pxSize.pxHeight;
    }

    public async drawOnContext(context: CanvasRenderingContext2D, position: PxPosition) {
        await this.loaded;

        const { pxX, pxY } = position;

        context.drawImage(this.img, pxX, pxY);
    }
}
