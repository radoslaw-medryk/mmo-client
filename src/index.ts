import "./index.scss";
import { ViewPort } from "./visual/viewport/ViewPort";

const root = document.createElement("div");
document.body.appendChild(root);

const viewport = new ViewPort({
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

viewport.mount(root);

console.log("Hello world");
