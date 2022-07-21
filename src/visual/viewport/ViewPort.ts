import { GamePxPosition } from "../../models/GamePxPosition";
import { Layer } from "../layer/Layer";
import { Mountable } from "../mountable/Mountable";
import { VisualConsts } from "../../models/VisualConsts";

export class ViewPort extends Mountable {
    private container: HTMLDivElement;
    private layer: Layer;

    constructor(visualConsts: VisualConsts, center: GamePxPosition) {
        super();

        this.container = document.createElement("div");
        this.container.className = "mmo-viewport";

        const { viewPortSize } = visualConsts;
        this.container.style.width = `${viewPortSize.pxWidth}px`;
        this.container.style.height = `${viewPortSize.pxHeight}px`;

        this.layer = new Layer(visualConsts, center);
        this.layer.mount(this.container);
    }

    public mount(parent: HTMLElement) {
        super.mount(parent, this.container);
    }

    public unmount() {
        super.unmount();
    }

    public centerOn(position: GamePxPosition) {
        this.layer.centerOn(position);
    }

    public getLayer() {
        return this.layer;
    }
}
