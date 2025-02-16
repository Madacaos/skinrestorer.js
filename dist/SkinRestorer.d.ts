import { DatabaseProvider } from './types';
import Player from './Player';
export default class SkinRestorer {
    private dbProvider;
    constructor(dbProvider: DatabaseProvider);
    getPlayer(playerName: string): Promise<Player>;
}
