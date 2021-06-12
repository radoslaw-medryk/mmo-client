import { Game } from "../game/Game";
import { dummyStep } from "./dummyStep";

export function startDummy(game: Game): () => Promise<void> {
    let isDummyRunning = true;
    let dummyPromise: Promise<void> | undefined;

    async function stopDummy() {
        isDummyRunning = false;
        await dummyPromise;
    }

    async function runDummy() {
        while (isDummyRunning) {
            await dummyStep(game);
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }

    dummyPromise = runDummy();

    return stopDummy;
}
