import { GamePxRectangle } from "../../models/GamePxRectangle";

export function rectanglesOverlap(a: GamePxRectangle, b: GamePxRectangle) {
    return (
        a.topLeft.gamePxX <= b.bottomRight.gamePxX &&
        a.topLeft.gamePxY <= b.bottomRight.gamePxY &&
        a.bottomRight.gamePxX >= b.topLeft.gamePxX &&
        a.bottomRight.gamePxY >= b.topLeft.gamePxY
    );
}
