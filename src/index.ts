import { VisualController } from "./engine/visualController/VisualController";
import "./index.scss";

const root = document.createElement("div");
document.body.appendChild(root);

const visualController = new VisualController({
    bufferPxSize: 256,
    viewPortSize: {
        pxWidth: 6 * 128,
        pxHeight: 6 * 128,
    },
    chunkSize: {
        pxWidth: 6 * 128,
        pxHeight: 6 * 128,
    },
});

visualController.mountViewPort(root);

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

    visualController.centerOn({ gamePxX: x, gamePxY: y });
});

console.log("Hello world");
