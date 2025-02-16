import { DatabaseProvider } from './types';
import { Buffer } from 'buffer';
import { Base64 } from 'js-base64';

export default class Player {
    playerName: string;
    uuid: string | null;
    private dbProvider: DatabaseProvider;

    constructor(playerName: string, dbProvider: DatabaseProvider) {
        this.playerName = playerName;
        this.dbProvider = dbProvider;
        this.uuid = null;
    }

    async initialize() {
        this.uuid = await Player.getSkinRestorerID(this.playerName, this.dbProvider) ||
            await Player.getMojangID(this.playerName);
    }

    async getSkin(): Promise<Blob | null> {
        if (!this.uuid) return null;

        const lastSkin = await this.dbProvider.findLastPlayerHistory(this.uuid);

        if (!lastSkin) return await Player.getCraftSkin(this.uuid);

        if (lastSkin.skin_type === 'URL') {
            const response = await fetch(lastSkin.skin_identifier);
            if (!response.ok) return null;
            return await response.blob();
        }

        const skinValue = await this.dbProvider.findPlayerSkin(lastSkin.skin_identifier);
        if (!skinValue) return await Player.getCraftSkin(this.uuid);

        const decodedValue = Base64.decode(skinValue.value);
        const skinData = JSON.parse(decodedValue);

        if (skinData && skinData.textures && skinData.textures.SKIN && skinData.textures.SKIN.url) {
            const response = await fetch(skinData.textures.SKIN.url);
            if (response.ok)
                return await response.blob();
        }

        return await Player.getCraftSkin(this.uuid);
    }

    static async getCraftSkin(uuid: string): Promise<Blob | null> {
        const response = await fetch(`https://crafatar.com/skins/${uuid}`);
        if (!response.ok) return null;
        return await response.blob();
    }

    static async getSkinRestorerID(playerName: string, dbProvider: DatabaseProvider): Promise<string | null> {
        const cacheEntry = await dbProvider.findPlayerCache(playerName);
        return cacheEntry?.uuid || null;
    }

    static async getMojangID(playerName: string): Promise<string | null> {
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${playerName}`);
        if (!response.ok) return null;
        return (await response.json()).id;
    }

    static async toBase64(blob: Blob): Promise<string> {
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return buffer.toString('base64');
    }

    static toBlob(base64: string): Blob {
        const binaryString = atob(base64);
        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }
        return new Blob([byteArray]);
    }
}