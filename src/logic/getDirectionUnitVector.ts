import { Direction } from "../models/Direction";
import { PxVector } from "../models/PxVector";

export function getDirectionUnitVector(direction: Direction): PxVector {
    switch (direction) {
        case Direction.North:
            return { pxX: 0, pxY: -1 };

        case Direction.East:
            return { pxX: 1, pxY: 0 };

        case Direction.South:
            return { pxX: 0, pxY: 1 };

        case Direction.West:
            return { pxX: -1, pxY: 0 };
    }
}
