import mysql from 'mysql2/promise';
import { DatabaseProvider, PlayerHistory, PlayerSkin, CacheEntry } from './types';

export class MysqlProvider implements DatabaseProvider {
    private pool: mysql.Pool;

    constructor(config: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
    }) {
        this.pool = mysql.createPool({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.database,
        });
    }

    async findLastPlayerHistory(uuid: string): Promise<PlayerHistory | null> {
        const [rows] = await this.pool.query(
            'SELECT * FROM sr_player_history WHERE uuid = ? ORDER BY timestamp DESC LIMIT 1',
            [uuid]
        );
        const result = rows as mysql.RowDataPacket[];
        return result[0] as PlayerHistory || null;
    }

    async findPlayerSkin(uuid: string): Promise<PlayerSkin | null> {
        const [rows] = await this.pool.query(
            'SELECT * FROM sr_player_skins WHERE uuid = ?',
            [uuid]
        );
        const result = rows as mysql.RowDataPacket[];
        return result[0] as PlayerSkin || null;
    }

    async findPlayerCache(name: string): Promise<CacheEntry | null> {
        const [rows] = await this.pool.query(
            'SELECT * FROM sr_cache WHERE name = ?',
            [name]
        );
        const result = rows as mysql.RowDataPacket[];
        return result[0] as CacheEntry || null;
    }

    async close() {
        await this.pool.end();
    }
}