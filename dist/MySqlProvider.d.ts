import { DatabaseProvider, PlayerHistory, PlayerSkin, CacheEntry } from './types';
export declare class MysqlProvider implements DatabaseProvider {
    private pool;
    constructor(config: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
    });
    findLastPlayerHistory(uuid: string): Promise<PlayerHistory | null>;
    findPlayerSkin(uuid: string): Promise<PlayerSkin | null>;
    findPlayerCache(name: string): Promise<CacheEntry | null>;
    close(): Promise<void>;
}
