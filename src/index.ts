import { startDummy } from "./dummy/startDummy";
import { Game } from "./game/Game";
import { Visual } from "./visual/Visual";

const game = new Game({ playerPos: { x: 100, y: 100 } });
const visual = new Visual(game);
startDummy(game);
