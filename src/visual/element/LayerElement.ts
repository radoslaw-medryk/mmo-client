import { GamePxRectangle } from "../../models/GamePxRectangle";
import { rectanglesOverlap } from "../logic/rectanglesOverlap";
import { LayerElementSettings } from "./LayerElementSettings";

export class LayerElement {
    public elementSettings: LayerElementSettings;

    constructor(elementSettings: LayerElementSettings) {
        this.elementSettings = elementSettings;
    }

    public overlapsArea(rectangle: GamePxRectangle) {
        return rectanglesOverlap(this.elementSettings.rectangle, rectangle);
    }
}
