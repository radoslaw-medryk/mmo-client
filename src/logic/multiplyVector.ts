import { PxVector } from "../models/PxVector";

export function multiplyVector({ pxX, pxY }: PxVector, scalar: number): PxVector {
    return { pxX: pxX * scalar, pxY: pxY * scalar };
}
