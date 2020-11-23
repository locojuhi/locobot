import { config } from 'dotenv';
import tmi from 'tmi.js';
config();

console.log("Bot Running");

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

console.log(
    botOptions
);
const client = new tmi.client(botOptions);

client.connect();

client.on('connected', (address, port) => {
    console.log('Its Connected?');
    client.say(process.env.TWITCH_BOT_USERNAME, 'Hola locojuhi');
});

client.on('chat', (channel, tags, message, self) => {
    console.log(tags);
	if(self || !message.startsWith('!')) return;

	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

	if(command === 'echo') {
		client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
	}
});

client.on('roomstate', (channel, state) => {
    console.log(state);
});
