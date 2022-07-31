import { addVectorToGamePxPosition } from "../../logic/addVectorToGamePxPosition";
import { multiplyVector } from "../../logic/multiplyVector";
import { Direction } from "../../models/Direction";
import { GamePxPosition } from "../../models/GamePxPosition";
import { PxVector } from "../../models/PxVector";
import { VisualConsts } from "../../models/VisualConsts";
import { Eventable } from "../../utils/Eventable";

export class CommunicationController {
    private visualConsts: VisualConsts;
    private stepSizePx = 10;

    private playerPosition: GamePxPosition = { gamePxX: 0, gamePxY: 0 };

    public onPlayerPositionChanged = new Eventable<GamePxPosition>();

    constructor(visualConsts: VisualConsts) {
        this.visualConsts = visualConsts;
    }

    public inputPlayerMove(direction: Direction) {
        const unitVector = this.getDirectionUnitVector(direction);
        const moveVector = multiplyVector(unitVector, this.stepSizePx);

        const newPlayerPosition = addVectorToGamePxPosition(this.playerPosition, moveVector);
        this.changePlayerPosition(newPlayerPosition);
    }

    private getDirectionUnitVector(direction: Direction): PxVector {
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

    private changePlayerPosition(newPlayerPosition: GamePxPosition) {
        this.playerPosition = newPlayerPosition;
        this.onPlayerPositionChanged.trigger(newPlayerPosition);
    }
}
