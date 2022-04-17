import { GamePxPosition } from "../../models/GamePxPosition";
import { GamePxRectangle } from "../../models/GamePxRectangle";
import { rectanglesOverlap } from "../logic/rectanglesOverlap";
import { LayerElementSettings } from "./LayerElementSettings";

export class LayerElement {
    public elementSettings: LayerElementSettings;
    public gamePxRectangle: GamePxRectangle;

    constructor(elementSettings: LayerElementSettings) {
        this.elementSettings = elementSettings;

        const { gamePxPosition, sprite } = elementSettings;

        const bottomRight: GamePxPosition = {
            gamePxX: gamePxPosition.gamePxX + sprite.pxSize.pxWidth,
            gamePxY: gamePxPosition.gamePxY + sprite.pxSize.pxHeight,
        };

        this.gamePxRectangle = {
            topLeft: gamePxPosition,
            bottomRight,
        };
    }

    public overlapsArea(rectangle: GamePxRectangle) {
        return rectanglesOverlap(this.gamePxRectangle, rectangle);
    }
}
