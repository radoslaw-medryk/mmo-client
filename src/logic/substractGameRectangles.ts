import { GamePxRectangle } from "../models/GamePxRectangle";

export function substractGameRectangles(base: GamePxRectangle, substractor: GamePxRectangle): GamePxRectangle[] {
    const baseLeft = base.topLeft.gamePxX;
    const baseTop = base.topLeft.gamePxY;
    const baseRight = base.bottomRight.gamePxX;
    const baseBottom = base.bottomRight.gamePxY;

    const subLeft = substractor.topLeft.gamePxX;
    const subTop = substractor.topLeft.gamePxY;
    const subRight = substractor.bottomRight.gamePxX;
    const subBottom = substractor.bottomRight.gamePxY;

    const results: GamePxRectangle[] = [];

    const topLeft: GamePxRectangle = {
        topLeft: {
            gamePxX: baseLeft,
            gamePxY: baseTop,
        },
        bottomRight: {
            gamePxX: Math.min(baseRight, subLeft),
            gamePxY: Math.min(baseBottom, subTop),
        },
    };
    results.push(topLeft);

    const top: GamePxRectangle = {
        topLeft: {
            gamePxX: Math.max(baseLeft, subLeft),
            gamePxY: baseTop,
        },
        bottomRight: {
            gamePxX: Math.min(baseRight, subRight),
            gamePxY: Math.min(baseBottom, subTop),
        },
    };
    results.push(top);

    const topRight: GamePxRectangle = {
        topLeft: {
            gamePxX: Math.max(baseLeft, subRight),
            gamePxY: baseTop,
        },
        bottomRight: {
            gamePxX: baseRight,
            gamePxY: Math.min(baseBottom, subTop),
        },
    };
    results.push(topRight);

    const left: GamePxRectangle = {
        topLeft: {
            gamePxX: baseLeft,
            gamePxY: Math.max(baseTop, subTop),
        },
        bottomRight: {
            gamePxX: Math.min(baseRight, subLeft),
            gamePxY: Math.min(baseBottom, subBottom),
        },
    };
    results.push(left);

    const right: GamePxRectangle = {
        topLeft: {
            gamePxX: Math.max(baseLeft, subRight),
            gamePxY: Math.max(baseTop, subTop),
        },
        bottomRight: {
            gamePxX: baseRight,
            gamePxY: Math.min(baseBottom, subBottom),
        },
    };
    results.push(right);

    const bottomLeft: GamePxRectangle = {
        topLeft: {
            gamePxX: baseLeft,
            gamePxY: Math.max(baseTop, subBottom),
        },
        bottomRight: {
            gamePxX: Math.min(baseRight, subLeft),
            gamePxY: baseBottom,
        },
    };
    results.push(bottomLeft);

    const bottom: GamePxRectangle = {
        topLeft: {
            gamePxX: Math.max(baseLeft, subLeft),
            gamePxY: Math.max(baseTop, subBottom),
        },
        bottomRight: {
            gamePxX: Math.min(baseRight, subRight),
            gamePxY: baseBottom,
        },
    };
    results.push(bottom);

    const bottomRight: GamePxRectangle = {
        topLeft: {
            gamePxX: Math.max(baseLeft, subRight),
            gamePxY: Math.max(baseTop, subBottom),
        },
        bottomRight: {
            gamePxX: baseRight,
            gamePxY: baseBottom,
        },
    };
    results.push(bottomRight);

    return results.filter(isValidRectangle);
}

function isValidRectangle({ topLeft, bottomRight }: GamePxRectangle): boolean {
    const top = topLeft.gamePxY;
    const left = topLeft.gamePxX;
    const right = bottomRight.gamePxX;
    const bottom = bottomRight.gamePxY;

    return bottom > top && right > left;
}
