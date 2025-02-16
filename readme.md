# SkinRestorer.js

## Descrizione del Progetto

SkinRestorer.js è una libreria JavaScript che consente di ottenere la skin scelta in gioco da un giocatore utilizzando MySQL come ponte. Questa libreria è progettata per semplificare l'accesso alle skin dei giocatori in modo efficiente e diretto. È importante notare che questo progetto non è affiliato in alcun modo con SkinRestorer.

Se il database di SkinRestorer non presenta la skin richiesta, la libreria recupererà le skin dal registro di Minecraft tramite l'API di Mojang (api.mojang.com).

## Installazione

Assicurati di avere Node.js e MySQL installati sul tuo sistema. Puoi installare la libreria utilizzando npm:

```bash
npm install skinrestorer.js
```

## Utilizzo della Libreria

Di seguito è riportato un esempio di come utilizzare la libreria SkinRestorer.js. Ogni passaggio è spiegato in dettaglio.

### Esempio di Codice

<details>
<summary>Codice Completo</summary>

```javascript
// @ts-ignore
import { MysqlProvider } from './MysqlProvider';  // Importa il provider MySQL
// Nota: il nome del file deve corrispondere esattamente
import SkinRestorer from './SkinRestorer';
import Player from './Player';

async function main() {
    // Crea un'istanza di MysqlProvider con le credenziali del tuo database
    const provider = new MysqlProvider({
        host: 'your-ip',
        port: 3306,
        user: 'your-user',
        password: 'your-password',
        database: 'your-database',
    });

    // Crea un'istanza di SkinRestorer utilizzando il provider MySQL
    const sk = new SkinRestorer(provider);

    try {
        // Ottieni il giocatore dal database
        const player = await sk.getPlayer('Madacaos');

        // Ottieni la skin del giocatore
        const skin = await player.getSkin();

        // Se la skin esiste, conservala in formato Base64
        if (skin) {
            console.log(await Player.toBase64(skin));
        }
    } finally {
        // Chiudi la connessione al database
        await provider.close();
    }
}

main().catch(console.error);
```

</details>

### Spiegazione dei Passaggi

<details>
<summary>1. Importazione dei Moduli</summary>

Iniziamo importando i moduli necessari:

```javascript
// @ts-ignore
import { MysqlProvider } from './MysqlProvider';  // Importa il provider MySQL
import SkinRestorer from './SkinRestorer'; // Importa la libreria SkinRestorer
import Player from './Player'; // Importa la classe Player
```

Questi moduli ci permettono di gestire la connessione a MySQL e di utilizzare le funzionalità della libreria SkinRestorer.

</details>

<details>
<summary>2. Creazione di un'istanza di MysqlProvider</summary>

```javascript
const provider = new MysqlProvider({
    host: 'your-ip',
    port: 3306,
    user: 'your-user',
    password: 'your-password',
    database: 'your-database',
});
```

In questo passaggio, creiamo un'istanza di `MysqlProvider`, specificando le credenziali necessarie per connettersi al database MySQL. Sostituisci `'your-ip'`, `'your-user'`, `'your-password'` e `'your-database'` con i tuoi dati reali.

</details>

<details>
<summary>3. Creazione di un'istanza di SkinRestorer</summary>

```javascript
const sk = new SkinRestorer(provider);
```

Qui, inizializziamo `SkinRestorer` passando l'istanza di `MysqlProvider` che abbiamo creato. Questo ci permetterà di interagire con il database per recuperare le informazioni sulla skin del giocatore.

</details>

<details>
<summary>4. Ottenere il Giocatore</summary>

```javascript
const player = await sk.getPlayer('Madacaos');
```

Utilizziamo il metodo `getPlayer` per ottenere le informazioni del giocatore specificato (in questo caso, 'Madacaos'). Questo metodo restituisce un'istanza della classe `Player`.

</details>

<details>
<summary>5. Ottenere la Skin del Giocatore</summary>

```javascript
const skin = await player.getSkin();
```

Qui, chiamiamo il metodo `getSkin` sull'istanza del giocatore per ottenere la skin associata a quel giocatore. Se la skin è disponibile nel database di SkinRestorer, verrà restituita.

</details>

<details>
<summary>6. Convertila in Base64</summary>

```javascript
if (skin) {
    console.log(await Player.toBase64(skin));
}
```

Se la skin è presente, la convertiamo in formato Base64 utilizzando il metodo `toBase64` della classe `Player` e la stampiamo sulla console.

</details>

<details>
<summary>7. Chiusura della Connessione al Database</summary>

```javascript
await provider.close();
```

Infine, chiudiamo la connessione al database per liberare le risorse.

</details>

## Conclusione

SkinRestorer.js è una libreria potente e semplice da usare per ottenere le skin dei giocatori in un'applicazione JavaScript. Assicurati di sostituire le credenziali del database con quelle corrette per il tuo ambiente. Buon divertimento con il tuo progetto!

Nonaffi