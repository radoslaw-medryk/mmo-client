import { GamePxPosition } from "../models/GamePxPosition";
import { GamePxRectangle } from "../models/GamePxRectangle";
import { getContainingRectangleFromPoints } from "./getContainingRectangleFromPoints";

export function getContainingRectangleFromRectangles(rectangles: GamePxRectangle[]): GamePxRectangle | undefined {
    const points = rectangles.reduce<GamePxPosition[]>((arr, curr) => {
        arr.push(curr.topLeft, curr.bottomRight);
        return arr;
    }, []);

    return getContainingRectangleFromPoints(points);
}
