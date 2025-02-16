// @ts-ignore
import { MysqlProvider } from './MysqlProvider';  // nota: il nome del file deve corrispondere esattamente
import SkinRestorer from "./SkinRestorer";
import Player from "./Player";

async function main() {
    const provider = new MysqlProvider({
        host: 'your-ip',
        port: 3306,
        user: 'your-user',
        password: 'your-password',
        database: 'your-database',
    });

    const sk = new SkinRestorer(provider);

    try {
        const player = await sk.getPlayer("Madacaos");
        const skin = await player.getSkin();
        if (skin) {
            console.log(await Player.toBase64(skin));
        }
    } finally {
        await provider.close();
    }
}

main().catch(console.error);