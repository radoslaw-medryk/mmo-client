import { CustomEvent } from "../utils/CustomEvent";
import { getChangeValue } from "../utils/getChangeValue";
import { Position } from "./models/Position";
import { ValueOrChangeFunction } from "./models/ValueOrChangeFunction";
import { VisualState } from "./models/VisualState";

export class Game {
    private state: VisualState;

    public onPlayerPositionChanged = new CustomEvent<Position>();

    constructor(state: VisualState) {
        this.state = state;
    }

    public changePlayerPosition(change: ValueOrChangeFunction<Position>) {
        let { x, y } = getChangeValue(this.state.playerPos, change);

        x = Math.max(0, x);
        y = Math.max(0, y);

        this.state.playerPos.x = x;
        this.state.playerPos.y = y;

        this.onPlayerPositionChanged.trigger(this.state.playerPos);
    }
}
