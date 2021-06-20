import { Chunk } from "../chunk/Chunk";
import { Mountable } from "../mountable/Mountable";
import { LayerSettings } from "./LayerSettings";
import { LayerState } from "./LayerState";

export class Layer extends Mountable {
    private container: HTMLDivElement;
    private chunks: Chunk[] = [];

    private layerSettings: LayerSettings;
    private layerState: LayerState;

    constructor(layerSettings: LayerSettings) {
        super();

        this.layerSettings = layerSettings;

        this.layerState = {
            center: {
                gamePxX: 0,
                gamePxY: 0,
            },
        };

        this.container = document.createElement("div");
    }

    public mount(parent: HTMLElement) {
        super.mount(parent, this.container);
    }

    public unmount() {
        super.unmount(this.container);
    }

    private syncChunks() {
        const { center } = this.layerState;
    }
}
