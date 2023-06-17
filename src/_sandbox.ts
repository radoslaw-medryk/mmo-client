import "./index.scss";
import { substractGameRectangles } from "./logic/substractGameRectangles";
import { GamePxRectangle } from "./models/GamePxRectangle";

const display = document.querySelector(".display") as HTMLCanvasElement;
const sliderLeft = document.querySelector(".slider-left") as HTMLInputElement;
const sliderRight = document.querySelector(".slider-right") as HTMLInputElement;
const sliderTop = document.querySelector(".slider-top") as HTMLInputElement;
const sliderBottom = document.querySelector(".slider-bottom") as HTMLInputElement;

sliderLeft.addEventListener("change", update);
sliderRight.addEventListener("change", update);
sliderTop.addEventListener("change", update);
sliderBottom.addEventListener("change", update);

const canvasSizePx = 1000;

const context = display.getContext("2d")!;
display.width = canvasSizePx;
display.height = canvasSizePx;

const sub: GamePxRectangle = {
    topLeft: {
        gamePxX: 250,
        gamePxY: 450,
    },
    bottomRight: {
        gamePxX: 450,
        gamePxY: 750,
    },
};

function update() {
    const leftPc = sliderLeft!.valueAsNumber;
    const rightPc = sliderRight!.valueAsNumber;
    const topPc = sliderTop!.valueAsNumber;
    const bottomPc = sliderBottom!.valueAsNumber;

    const left = Math.round((leftPc * canvasSizePx) / 100);
    const right = Math.round((rightPc * canvasSizePx) / 100);
    const top = Math.round((topPc * canvasSizePx) / 100);
    const bottom = Math.round((bottomPc * canvasSizePx) / 100);

    const base: GamePxRectangle = {
        topLeft: {
            gamePxX: Math.min(left, right),
            gamePxY: Math.min(top, bottom),
        },
        bottomRight: {
            gamePxX: Math.max(left, right),
            gamePxY: Math.max(bottom, top),
        },
    };

    context.clearRect(0, 0, canvasSizePx, canvasSizePx);

    drawRect(base, "#aaaa66", "#ccccaa");
    drawRect(sub, "#66aaaa", "#aacccc");

    const diffs = substractGameRectangles(base, sub);
    for (const diff of diffs) {
        drawRect(diff, "#ff2222", "#cc8888");
    }
}

function drawRect({ topLeft, bottomRight }: GamePxRectangle, borderColor: string, fillColor: string) {
    const x = topLeft.gamePxX;
    const y = topLeft.gamePxY;
    const w = bottomRight.gamePxX - topLeft.gamePxX;
    const h = bottomRight.gamePxY - topLeft.gamePxY;

    context.fillStyle = fillColor;
    context.fillRect(x, y, w, h);
    context.strokeStyle = `5px solid ${borderColor}`;
    context.strokeRect(x, y, w, h);
}
