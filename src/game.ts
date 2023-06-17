import { CommunicationController } from "./engine/communicationController/CommunicationController";
import { VisualController } from "./engine/visualController/VisualController";
import "./index.scss";
import { Direction } from "./models/Direction";
import { VisualConsts } from "./models/VisualConsts";

const root = document.createElement("div");
document.body.appendChild(root);

const visualConsts: VisualConsts = {
    chunkBufferPxSize: 6 * 128,
    spriteBufferPxSize: 2 * 128,
    viewPortSize: {
        pxWidth: 6 * 128,
        pxHeight: 6 * 128,
    },
    chunkSize: {
        pxWidth: 6 * 128,
        pxHeight: 6 * 128,
    },
};

const communicationController = new CommunicationController(visualConsts);
const visualController = new VisualController(visualConsts);

visualController.mountViewPort(root);

communicationController.onPlayerPositionChanged.on(visualController.centerOn);
communicationController.onChunksAppeared.on(visualController.addChunks);
communicationController.onChunksDisappeared.on(visualController.removeChunks);
communicationController.onSpritesAppeared.on(visualController.drawSprites);

document.addEventListener("keydown", ({ code }) => {
    const direction = arrowCodeToDirection(code);
    if (!direction) {
        return;
    }

    communicationController.inputPlayerMove(direction);
});

function arrowCodeToDirection(code: string): Direction | undefined {
    switch (code) {
        case "ArrowUp":
            return Direction.North;

        case "ArrowDown":
            return Direction.South;

        case "ArrowLeft":
            return Direction.West;

        case "ArrowRight":
            return Direction.East;

        default:
            return undefined;
    }
}
