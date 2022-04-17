import "./index.scss";
import { ViewPort } from "./visual/viewport/ViewPort";

const root = document.createElement("div");
document.body.appendChild(root);

const viewport = new ViewPort({
    bufferSizePx: 256,
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

let x = 0;
let y = 0;

document.addEventListener("keydown", ({ code }) => {
    const d = 20;
    let dx = 0;
    let dy = 0;

    switch (code) {
        case "ArrowUp":
            dy = -d;
            break;

        case "ArrowDown":
            dy = d;
            break;

        case "ArrowLeft":
            dx = -d;
            break;

        case "ArrowRight":
            dx = d;
            break;

        default:
            return;
    }

    x += dx;
    y += dy;

    viewport.centerOn({ gamePxX: x, gamePxY: y });
});

console.log("Hello world");
