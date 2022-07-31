import { GamePxPosition } from "../models/GamePxPosition";
import { PxVector } from "../models/PxVector";

export function addVectorToGamePxPosition(
    { gamePxX, gamePxY }: GamePxPosition,
    { pxX, pxY }: PxVector
): GamePxPosition {
    return {
        gamePxX: gamePxX + pxX,
        gamePxY: gamePxY + pxY,
    };
}
