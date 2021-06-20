import "./index.scss";
import { randomColor } from "./utils/randomColor";
import { Canvas } from "./visual/layer/canvas/Canvas";

const root = document.createElement("div");
document.body.appendChild(root);

const canvas = new Canvas({
    tileSizePx: 128,
    edgeTilesCount: 6,
});

canvas.mount(root);

for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 6; y++) {
        canvas.fillTile(x, y, randomColor());
    }
}

console.log("Hello world");
