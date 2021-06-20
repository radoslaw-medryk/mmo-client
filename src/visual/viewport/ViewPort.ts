import { Layer } from "../layer/Layer";
import { Mountable } from "../mountable/Mountable";
import { VisualConsts } from "../VisualConsts";

export class ViewPort extends Mountable {
    private container: HTMLDivElement;
    private layer: Layer;

    constructor(visualConsts: VisualConsts) {
        super();

        this.container = document.createElement("div");
        this.container.className = "mmo-viewport";

        const { viewPortSize, tileSize } = visualConsts;
        const viewPortPxWidth = viewPortSize.tilesWidth * tileSize.pxWidth;
        const viewPortPxHeight = viewPortSize.tilesHeight * tileSize.pxHeight;
        this.container.style.width = `${viewPortPxWidth}px`;
        this.container.style.height = `${viewPortPxHeight}px`;

        this.layer = new Layer(visualConsts);
        this.layer.mount(this.container);

        this.layer.syncChunks();
        this.layer.__paintChunksRandomly();
    }

    public mount(parent: HTMLElement) {
        super.mount(parent, this.container);
    }

    public unmount() {
        super.unmount(this.container);
    }
}
