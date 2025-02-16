import { DatabaseProvider } from './types';
export default class Player {
    playerName: string;
    uuid: string | null;
    private dbProvider;
    constructor(playerName: string, dbProvider: DatabaseProvider);
    initialize(): Promise<void>;
    getSkin(): Promise<Blob | null>;
    static getCraftSkin(uuid: string): Promise<Blob | null>;
    static getSkinRestorerID(playerName: string, dbProvider: DatabaseProvider): Promise<string | null>;
    static getMojangID(playerName: string): Promise<string | null>;
    static toBase64(blob: Blob): Promise<string>;
    static toBlob(base64: string): Blob;
}
