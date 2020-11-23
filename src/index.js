import { config } from 'dotenv';
import tmi from 'tmi.js';
config();

console.log("Bot Running");

const botOptions = {
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL_NAMES
    ]
};

const client = new tmi.client(botOptions);

client.connect();

client.on('connected', (address, port) => {
    client.action(process.env.TWITCH_BOT_USERNAME, 'Hola jimrsng');
});
