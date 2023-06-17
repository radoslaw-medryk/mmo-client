import { GamePxPosition } from "../models/GamePxPosition";
import { GamePxRectangle } from "../models/GamePxRectangle";

export function isGamePositionWithinRectangle(
    { gamePxX, gamePxY }: GamePxPosition,
    { topLeft, bottomRight }: GamePxRectangle
): boolean {
    return (
        gamePxX >= topLeft.gamePxX &&
        gamePxX <= bottomRight.gamePxX &&
        gamePxY >= topLeft.gamePxY &&
        gamePxY <= bottomRight.gamePxY
    );
}
