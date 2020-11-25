import { config } from 'dotenv';
import tmi from 'tmi.js';

config();

const botOptions = {
    options: { 
        debug: true 
    },
    connection: {
		secure: true,
		reconnect: true
	},
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL_NAMES
    ]
};


const client = new tmi.client(botOptions)
client.connect();

client.on('chat', (channel, tags, message, self) => {
	if(self || !message.startsWith('!')) return;

	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

	if(command === 'echo') {
		client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
	}
});
