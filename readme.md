# SkinRestorer.js

## Project Description
SkinRestorer.js is a JavaScript library that allows you to retrieve the chosen skin in-game from a player using MySQL as a bridge. This library is designed to simplify access to player skins efficiently and directly. It is important to note that this project is not affiliated in any way with SkinRestorer. If the SkinRestorer database does not contain the requested skin, the library will retrieve the skins from the Minecraft registry via the Mojang API (api.mojang.com).

## Installation
Make sure you have Node.js and MySQL installed on your system. You can install the library using npm:
```bash
npm install skinrestorer.js
```

## Using the Library
Below is an example of how to use the SkinRestorer.js library. Each step is explained in detail.

### Code Example
<details>
<summary>Complete Code</summary>
```javascript
// @ts-ignore
import { MysqlProvider } from './MysqlProvider';  // Import MySQL provider
// Note: the filename must match exactly
import SkinRestorer from './SkinRestorer';
import Player from './Player';

async function main() {
// Create an instance of MysqlProvider with your database credentials
const provider = new MysqlProvider({
host: 'your-ip',
port: 3306,
user: 'your-user',
password: 'your-password',
database: 'your-database',
});

    // Create an instance of SkinRestorer using the MySQL provider
    const sk = new SkinRestorer(provider);

    try {
        // Get the player from the database
        const player = await sk.getPlayer('Madacaos');
        
        // Get the player's skin
        const skin = await player.getSkin();
        
        // If the skin exists, save it in Base64 format
        if (skin) {
            console.log(await Player.toBase64(skin));
        }
    } finally {
        // Close the database connection
        await provider.close();
    }
}

main().catch(console.error);
```
</details>

### Step-by-Step Explanation
<details>
<summary>1. Importing Modules</summary>
We begin by importing the necessary modules:
```javascript
// @ts-ignore
import { MysqlProvider } from './MysqlProvider';  // Import MySQL provider
import SkinRestorer from './SkinRestorer'; // Import SkinRestorer library
import Player from './Player'; // Import Player class
```
These modules allow us to manage the connection to MySQL and utilize the functionalities of the SkinRestorer library.
</details>

<details>
<summary>2. Creating an Instance of MysqlProvider</summary>
```javascript
const provider = new MysqlProvider({
    host: 'your-ip',
    port: 3306,
    user: 'your-user',
    password: 'your-password',
    database: 'your-database',
});
```
In this step, we create an instance of `MysqlProvider`, specifying the necessary credentials to connect to the MySQL database. Replace `'your-ip'`, `'your-user'`, `'your-password'`, and `'your-database'` with your actual data.
</details>

<details>
<summary>3. Creating an Instance of SkinRestorer</summary>
```javascript
const sk = new SkinRestorer(provider);
```
Here, we initialize `SkinRestorer` by passing the instance of `MysqlProvider` we created. This will allow us to interact with the database to retrieve player skin information.
</details>

<details>
<summary>4. Retrieving the Player</summary>
```javascript
const player = await sk.getPlayer('Madacaos');
```
We use the `getPlayer` method to retrieve the information of the specified player (in this case, 'Madacaos'). This method returns an instance of the `Player` class.
</details>

<details>
<summary>5. Retrieving the Player's Skin</summary>
```javascript
const skin = await player.getSkin();
```
Here, we call the `getSkin` method on the player instance to get the skin associated with that player. If the skin is available in the SkinRestorer database, it will be returned.
</details>

<details>
<summary>6. Converting to Base64</summary>
```javascript
if (skin) {
    console.log(await Player.toBase64(skin));
}
```
If the skin is present, we convert it to Base64 format using the `toBase64` method of the `Player` class and print it to the console.
</details>

<details>
<summary>7. Closing the Database Connection</summary>
```javascript
await provider.close();
```
Finally, we close the database connection to free up resources.
</details>

## Conclusion
SkinRestorer.js is a powerful and easy-to-use library for obtaining player skins in a JavaScript application. Make sure to replace the database credentials with the correct ones for your environment. Enjoy your project!