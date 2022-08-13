import { ChunkPosition } from "../../models/ChunkPosition";
import { Direction } from "../../models/Direction";
import { GamePxPosition } from "../../models/GamePxPosition";
import { VisualConsts } from "../../models/VisualConsts";
import { Eventable } from "../../utils/Eventable";
import { SpriteAppeared } from "./models/SpriteAppeared";
import { ServerMocker } from "./ServerMocker";

export class CommunicationController {
    private serverMocker: ServerMocker;

    public onPlayerPositionChanged = new Eventable<GamePxPosition>();
    public onChunksAppeared = new Eventable<ChunkPosition[]>();
    public onChunksDisappeared = new Eventable<ChunkPosition[]>();
    public onSpritesAppeared = new Eventable<SpriteAppeared[]>();

    constructor(visualConsts: VisualConsts) {
        this.serverMocker = new ServerMocker(visualConsts, this);
    }

    public inputPlayerMove(direction: Direction) {
        this.serverMocker.inputPlayerMove(direction);
    }
}
