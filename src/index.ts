import "./index.scss";
import { Layer } from "./visual/layer/Layer";

const root = document.createElement("div");
document.body.appendChild(root);

const layer = new Layer({
    tileSize: {
        pxWidth: 128,
        pxHeight: 128,
    },
    viewPortSize: {
        tilesWidth: 6,
        tilesHeight: 6,
    },
    chunkSize: {
        tilesWidth: 6,
        tilesHeight: 6,
    },
});

layer.mount(root);
layer.syncChunks();
layer.__paintChunksRandomly();

console.log("Hello world");
