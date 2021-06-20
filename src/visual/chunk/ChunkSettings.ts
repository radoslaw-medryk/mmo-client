import { ChunkPosition } from "../../models/ChunkPosition";
import { CanvasSettings } from "../canvas/CanvasSettings";

export type ChunkSettings = {
    position: ChunkPosition;
    canvasSettings: CanvasSettings;
};
