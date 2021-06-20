import { PxPosition } from "../../models/PxPosition";
import { PxSize } from "../../models/PxSize";

export class Sprite {
    private img: HTMLImageElement;

    private loaded: Promise<void>;

    constructor(path: string) {
        this.img = document.createElement("img");

        this.loaded = new Promise((resolve, reject) => {
            this.img.addEventListener("error", reject);
            this.img.addEventListener("load", () => resolve());
        });

        this.img.src = path;
    }

    public async getSize(): Promise<PxSize> {
        await this.loaded;

        return {
            pxWidth: this.img.width,
            pxHeight: this.img.height,
        };
    }

    public async drawOnContext(context: CanvasRenderingContext2D, position: PxPosition) {
        await this.loaded;

        const { pxX, pxY } = position;

        context.drawImage(this.img, pxX, pxY);
    }
}
