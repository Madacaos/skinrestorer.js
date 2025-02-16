export interface PlayerHistory {
    uuid: string;
    timestamp: Date;
    skin_type: 'URL' | 'VALUE';
    skin_identifier: string;
}

export interface PlayerSkin {
    uuid: string;
    value: string;
}

export interface CacheEntry {
    name: string;
    uuid: string;
}

export interface DatabaseProvider {
    findLastPlayerHistory(uuid: string): Promise<PlayerHistory | null>;
    findPlayerSkin(uuid: string): Promise<PlayerSkin | null>;
    findPlayerCache(name: string): Promise<CacheEntry | null>;
}