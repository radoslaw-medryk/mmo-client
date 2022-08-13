import { GamePxPosition } from "../../../models/GamePxPosition";
import { Sprite } from "../../../visual/sprites/Sprite";

export type SpriteAppeared = {
    sprite: Sprite;
    position: GamePxPosition;
};
