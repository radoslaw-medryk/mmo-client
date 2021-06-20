import "./index.scss";
import { randomColor } from "./utils/randomColor";
import { Canvas } from "./visual/canvas/Canvas";
import { Chunk } from "./visual/chunk/Chunk";

const root = document.createElement("div");
document.body.appendChild(root);

const chunk = new Chunk({
    position: {
        chunksX: 0,
        chunksY: 0,
    },
    canvasSettings: {
        tileSize: {
            pxWidth: 128,
            pxHeight: 128,
        },
        canvasSize: {
            tilesWidth: 6,
            tilesHeight: 6,
        },
    },
});

chunk.mount(root);

for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 6; y++) {
        chunk.fillTile(x, y, randomColor());
    }
}

console.log("Hello world");
