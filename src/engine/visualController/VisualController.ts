import { ChunkPosition } from "../../models/ChunkPosition";
import { GamePxPosition } from "../../models/GamePxPosition";
import { VisualConsts } from "../../models/VisualConsts";
import { ViewPort } from "../../visual/viewport/ViewPort";
import { SpriteAppeared } from "../communicationController/models/SpriteAppeared";

export class VisualController {
    private viewPort: ViewPort;

    private center: GamePxPosition = { gamePxX: 0, gamePxY: 0 };

    constructor(visualConsts: VisualConsts) {
        this.viewPort = new ViewPort(visualConsts, this.center);
    }

    public mountViewPort(parent: HTMLElement) {
        this.viewPort.mount(parent);
    }

    public centerOn = async (gamePxPosition: GamePxPosition) => {
        this.center = {
            gamePxX: gamePxPosition.gamePxX,
            gamePxY: gamePxPosition.gamePxY,
        };

        this.viewPort.centerOn(gamePxPosition);
    };

    public drawSprites = async (sprites: SpriteAppeared[]) => {
        const layer = this.viewPort.getLayer();

        for (const { sprite, position } of sprites) {
            await layer.drawSprite(sprite, position);
        }
    };

    public addChunks = (chunks: ChunkPosition[]) => {
        const layer = this.viewPort.getLayer();

        for (const chunk of chunks) {
            layer.addChunk(chunk);
        }
    };

    public removeChunks = (chunks: ChunkPosition[]) => {
        const layer = this.viewPort.getLayer();

        for (const chunk of chunks) {
            layer.removeChunk(chunk);
        }
    };
}
