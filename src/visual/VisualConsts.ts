import { PxSize } from "../models/PxSize";
import { TilesSize } from "../models/TilesSize";

export type VisualConsts = {
    chunkSize: TilesSize;
    viewPortSize: TilesSize;
    bufferSizePx: number;
    tileSize: PxSize;
};
