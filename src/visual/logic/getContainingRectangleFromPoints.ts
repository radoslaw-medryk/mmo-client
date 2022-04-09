import { GamePxPosition } from "../../models/GamePxPosition";
import { GamePxRectangle } from "../../models/GamePxRectangle";

export function getContainingRectangleFromPoints(points: GamePxPosition[]): GamePxRectangle | undefined {
    if (points.length === 0) {
        return undefined;
    }

    let topLeftPxX = undefined;
    let topLeftPxY = undefined;
    let bottomRightPxX = undefined;
    let bottomRightPxY = undefined;

    for (const point of points) {
        topLeftPxX = Math.min(topLeftPxX ?? point.gamePxX, point.gamePxX);
        topLeftPxY = Math.min(topLeftPxY ?? point.gamePxY, point.gamePxY);
        bottomRightPxX = Math.max(bottomRightPxX ?? point.gamePxX, point.gamePxX);
        bottomRightPxY = Math.max(bottomRightPxY ?? point.gamePxY, point.gamePxY);
    }
}
