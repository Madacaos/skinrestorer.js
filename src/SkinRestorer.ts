import { DatabaseProvider } from './types';
import Player from './Player';

export default class SkinRestorer {
    private dbProvider: DatabaseProvider;

    constructor(dbProvider: DatabaseProvider) {
        this.dbProvider = dbProvider;
    }

    async getPlayer(playerName: string) {
        const player = new Player(playerName, this.dbProvider);
        await player.initialize();
        return player;
    }
}